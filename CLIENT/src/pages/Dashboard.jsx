import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

function Dashboard() {

  // Backend API URL from .env
  const API = import.meta.env.VITE_API_URL;

  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const getPatients = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API}/patients`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        setPatients(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    getPatients();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            Patient List
          </h1>

          <p className="text-zinc-400">
            Select a virtual patient to begin diagnosis.
          </p>

        </div>

        {/* Patient Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {patients.map((patient) => (

            <div
              key={patient._id}
              onClick={() => navigate(`/chat/${patient._id}`)}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 cursor-pointer hover:border-blue-500 hover:scale-[1.02] transition duration-300"
            >

              {/* Icon */}
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-5">

                <UserRound size={24} />

              </div>

              {/* Name */}
              <h2 className="text-2xl font-semibold mb-2">
                {patient.name}
              </h2>

              {/* Disease */}
              <p className="text-zinc-400 mb-4">
                Disease: {patient.disease}
              </p>

              {/* Symptoms */}
              <div className="flex flex-wrap gap-2">

                {patient.symptoms?.map((symptom, index) => (

                  <span
                    key={index}
                    className="bg-zinc-800 text-zinc-300 text-sm px-3 py-1 rounded-full"
                  >

                    {symptom}

                  </span>

                ))}

              </div>
            </div>

          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;