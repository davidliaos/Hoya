"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function Component() {
  const [localConvo, setLocalConvo] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [admissionSocketUrl, setAdmissionSocketUrl] = useState(
    "ws://localhost:8080/api/chatbot/admission-requirements"
  );
  const [applicationSocketUrl, setApplicationSocketUrl] = useState(
    "ws://localhost:8080/api/chatbot/application-process"
  );
  const [financialSocketUrl, setFinancialSocketUrl] = useState(
    "ws://localhost:8080/api/chatbot/financial-aid"
  );
  const [choosingSocketUrl, setChoosingSocketUrl] = useState(
    "ws://localhost:8080/api/chatbot/choosing-college"
  );
  const [careerSocketUrl, setCareerSocketUrl] = useState(
    "ws://localhost:8080/api/chatbot/career-preparation"
  );
  const [loading, setLoading] = useState(false);

  const { sendMessage, lastMessage, readyState } =
    useWebSocket(admissionSocketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setLocalConvo([...localConvo]);
      setLoading(false);
    }
  }, [lastMessage]);

  const router = useRouter();

  useEffect(() => {
    document.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage(userInput);
        if (category === "Admission Requirements")
          setLocalConvo([
            [...localConvo[0], userInput],
            localConvo[1],
            localConvo[2],
            localConvo[3],
            localConvo[4],
          ]);
        else if (category === "Application Process")
          setLocalConvo([
            localConvo[0],
            [...localConvo[1], userInput],
            localConvo[2],
            localConvo[3],
            localConvo[4],
          ]);
        else if (category === "Financial Aid and Scholarship")
          setLocalConvo([
            localConvo[0],
            localConvo[1],
            [...localConvo[2], userInput],
            localConvo[3],
            localConvo[4],
          ]);
        else if (category === "Choosing a College")
          setLocalConvo([
            localConvo[0],
            localConvo[1],
            localConvo[2],
            [...localConvo[3], userInput],
            localConvo[4],
          ]);
        else if (category === "Career Path")
          setLocalConvo([
            localConvo[0],
            localConvo[1],
            localConvo[2],
            localConvo[3],
            [...localConvo[4], userInput],
          ]);
        setUserInput("");
      }
    });
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    } else {
      (async () => {
        const data = await fetch("http://localhost:8080/api/home/user-info", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")!,
          },
        });
        const data_pres = await data.json();

        setUsername(data_pres.first_name + " " + data_pres.last_name);
      })();
    }
  }, []);

  function getCurrentCategory() {
    if (category === "Admission Requirements") return 0;
    else if (category === "Application Process") return 1;
    else if (category === "Financial Aid and Scholarship") return 2;
    else if (category === "Choosing a College") return 3;
    else if (category === "Career Path") return 4;
    else return 0;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/5 overflow-y-auto bg-[#1a1b26] text-white flex flex-col">
        <div className="flex flex-col items-center">
          <h1 className="text-center mt-6 text-2xl font-bold">Pathfinder.ai</h1>
          <img src="logo.png" alt="logo" className="w-[130px]" />
        </div>
        <div>
          <button
            className={`hover:bg-[#24283b] w-[100%] text-md py-4 ${
              category === "Admission Requirements" ? "bg-[#24283b]" : ""
            }`}
            onClick={() => setCategory("Admission Requirements")}
          >
            Admission Requirements
          </button>
          <button
            className={`hover:bg-[#24283b] w-[100%] text-md py-4 ${
              category === "Application Process" ? "bg-[#24283b]" : ""
            }`}
            onClick={() => setCategory("Application Process")}
          >
            Application Process
          </button>
          <button
            className={`hover:bg-[#24283b] w-[100%] text-md py-4 ${
              category === "Financial Aid and Scholarship" ? "bg-[#24283b]" : ""
            }`}
            onClick={() => setCategory("Financial Aid and Scholarship")}
          >
            Financial Aid and Scholarships
          </button>
          <button
            className={`hover:bg-[#24283b] w-[100%] text-md py-4 ${
              category === "Choosing a College" ? "bg-[#24283b]" : ""
            }`}
            onClick={() => setCategory("Choosing a College")}
          >
            Choosing a College
          </button>
          <button
            className={`hover:bg-[#24283b] w-[100%] text-md py-4 ${
              category === "Career Path" ? "bg-[#24283b]" : ""
            }`}
            onClick={() => setCategory("Career Path")}
          >
            Career Path
          </button>
        </div>
        <div className="flex flex-col-reverse p-3 flex-1">
          <div className="flex items-center">
            <img
              src="/grad.jpg"
              alt="gradient decent"
              className="rounded-full w-[55px] h-[55px]"
            />
            <h2 className="ms-4">{username}</h2>
          </div>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 h-[60px]"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Sign out
        </button>
      </aside>

      <div className="flex flex-col flex-grow">
        <main className="overflow-y-auto p-6 space-y-4 flex-grow bg-[#414868] text-white">
          {localConvo[getCurrentCategory()].length === 0 ? (
            <>
              <div className="flex justify-center">
                <h2 className="text-3xl font-bold mt-16">{category}</h2>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex flex-col">
            {category === "Admission Requirements" ? (
              <>
                {localConvo[0].map((input, i) => (
                  <>
                    {i % 2 === 0 ? (
                      <div className="flex justify-start ml-auto bg-blue-500 rounded-xl px-4 py-1 max-w-[500px] rounded-tr-none">
                        <p>{input}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end mr-auto bg-gray-500 rounded-xl px-4 py-1 max-w-[300px] rounded-tl-none">
                        <p>{input}</p>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : category === "Application Process" ? (
              <>
                {localConvo[1].map((input, i) => (
                  <>
                    {i % 2 === 0 ? (
                      <div className="flex justify-start ml-auto bg-blue-500 rounded-xl px-4 py-1 max-w-[500px] rounded-tr-none">
                        <p>{input}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end mr-auto bg-gray-500 rounded-xl px-4 py-1 max-w-[300px] rounded-tl-none">
                        <p>{input}</p>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : category === "Financial Aid and Scholarship" ? (
              <>
                {localConvo[2].map((input, i) => (
                  <>
                    {i % 2 === 0 ? (
                      <div className="flex justify-start ml-auto bg-blue-500 rounded-xl px-4 py-1 max-w-[500px] rounded-tr-none">
                        <p>{input}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end mr-auto bg-gray-500 rounded-xl px-4 py-1 max-w-[300px] rounded-tl-none">
                        <p>{input}</p>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : category === "Choosing a College" ? (
              <>
                {localConvo[3].map((input, i) => (
                  <>
                    {i % 2 === 0 ? (
                      <div className="flex justify-start ml-auto bg-blue-500 rounded-xl px-4 py-1 max-w-[500px] rounded-tr-none">
                        <p>{input}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end mr-auto bg-gray-500 rounded-xl px-4 py-1 max-w-[300px] rounded-tl-none">
                        <p>{input}</p>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : category === "Career Path" ? (
              <>
                {localConvo[4].map((input, i) => (
                  <>
                    {i % 2 === 0 ? (
                      <div className="flex justify-start ml-auto bg-blue-500 rounded-xl px-4 py-1 max-w-[500px] rounded-tr-none">
                        <p>{input}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end mr-auto bg-gray-500 rounded-xl px-4 py-1 max-w-[300px] rounded-tl-none">
                        <p>{input}</p>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </main>

        {category === "" ? (
          <></>
        ) : (
          <footer className="p-6 bg-[#24283b]">
            <div className="flex items-center gap-3">
              <img
                src="/micon.svg.png"
                alt="Microphone"
                className="ml-2 h-8 w-8"
                style={{ cursor: "pointer" }}
              />
              <div className="flex-grow flex items-center">
                <input
                  className="rounded-lg bg-[#9aa5ce] text-[#24283b] py-4 px-2 w-[100%] h-[50px] placeholder:text-[#24283b]"
                  placeholder="Message Adviser"
                  onChange={(e) => setUserInput(e.target.value)}
                  value={userInput}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2"
                onClick={() => {
                  setLoading(true);
                  sendMessage(userInput);
                  if (category === "Admission Requirements")
                    setLocalConvo([
                      [...localConvo[0], userInput],
                      localConvo[1],
                      localConvo[2],
                      localConvo[3],
                      localConvo[4],
                    ]);
                  else if (category === "Application Process")
                    setLocalConvo([
                      localConvo[0],
                      [...localConvo[1], userInput],
                      localConvo[2],
                      localConvo[3],
                      localConvo[4],
                    ]);
                  else if (category === "Financial Aid and Scholarship")
                    setLocalConvo([
                      localConvo[0],
                      localConvo[1],
                      [...localConvo[2], userInput],
                      localConvo[3],
                      localConvo[4],
                    ]);
                  else if (category === "Choosing a College")
                    setLocalConvo([
                      localConvo[0],
                      localConvo[1],
                      localConvo[2],
                      [...localConvo[3], userInput],
                      localConvo[4],
                    ]);
                  else if (category === "Career Path")
                    setLocalConvo([
                      localConvo[0],
                      localConvo[1],
                      localConvo[2],
                      localConvo[3],
                      [...localConvo[4], userInput],
                    ]);
                  setUserInput("");
                }}
              >
                Send
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
