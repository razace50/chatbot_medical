const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithPatient = async (req, res) => {
  try {
    const { message } = req.body;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are acting as a real patient.

Patient Details:
- Name: John Smith
- Age: 45
- Disease: Gastritis

Symptoms:
- stomach pain
- nausea
- vomiting
- heartburn

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
      reply:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};