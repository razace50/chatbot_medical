const Groq = require("groq-sdk");
const Patient = require("../models/Patient");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithPatient = async (req, res) => {
  try {
    const { message, patientId } = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are acting as a real patient.

Patient Details:
- Name: ${patient.name}
- Age: ${patient.age}
- Disease: ${patient.disease}
- Symptoms: ${patient.symptoms.join(", ")}

Rules:
- Reply like a human patient
- Keep answers short
- Do not act like AI
- Only answer medical questions
`,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};
