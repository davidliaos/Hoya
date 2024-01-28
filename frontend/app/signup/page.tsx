"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";

interface SignupInfo {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  major_interests: string[];
  college_budget: number;
  location: string[];
  sports: string[];
}

export default function Signup() {
  const [signupState, setSignupState] = useState(0);
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    major_interests: [],
    college_budget: 5000,
    location: [],
    sports: [],
  });

  const router = useRouter();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-br from-[#565f89] to-[#414868]">
      <div className="flex flex-col bg-[#1a1b26] p-4 rounded-lg gap-4 w-[530px]">
        <h1 className="text-white text-xl font-bold border-b-2 border-b-white pb-2">
          Sign Up
        </h1>
        {signupState === 0 ? (
          <>
            {" "}
            <div className="flex gap-2 ">
              <input
                className="w-[240px] h-8 ps-3 rounded-sm text-sm"
                placeholder="First name"
                type="text"
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, first_name: e.target.value })
                }
                value={signupInfo.first_name}
              />
              <input
                className="w-[240px] h-8 ps-3 rounded-sm text-sm"
                placeholder="Last name"
                type="text"
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, last_name: e.target.value })
                }
                value={signupInfo.last_name}
              />
            </div>
            <input
              className="w-29 h-8 ps-3 rounded-sm text-sm"
              placeholder="Email"
              type="email"
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, email: e.target.value })
              }
              value={signupInfo.email}
            />
            <input
              className="w-29 h-8 ps-3 rounded-sm text-sm"
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, password: e.target.value })
              }
              value={signupInfo.password}
            />
            <button
              className="self-start bg-[#7aa2f7] hover:bg-[#5673b2] px-4 py-1 rounded-md"
              onClick={() => setSignupState(1)}
            >
              Next
            </button>
            <p className="text-white text-xs">
              Click to here to{" "}
              <a
                className="text-blue-600 hover:text-blue-700 cursor-pointer"
                href="/login"
              >
                log in
              </a>
            </p>
          </>
        ) : signupState === 1 ? (
          <>
            <h2 className="text-white font-bold">
              What majors are you interested in?
            </h2>
            <Select
              onValueChange={(e) =>
                setSignupInfo({
                  ...signupInfo,
                  major_interests: [...signupInfo.major_interests, e],
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a major" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Majors</SelectLabel>
                  <SelectItem value="Accounting">Accounting</SelectItem>
                  <SelectItem value="Aerospace Engineering">
                    Aerospace Engineering
                  </SelectItem>
                  <SelectItem value="African American Studies">
                    African American Studies
                  </SelectItem>
                  <SelectItem value="Animal Science">Animal Science</SelectItem>
                  <SelectItem value="Anthropology">Anthropology</SelectItem>
                  <SelectItem value="Architecture">Architecture</SelectItem>
                  <SelectItem value="Art History">Art History</SelectItem>
                  <SelectItem value="Astrophysics">Astrophysics</SelectItem>
                  <SelectItem value="Athletic Training">
                    Athletic Training
                  </SelectItem>
                  <SelectItem value="Aviation">Aviation</SelectItem>
                  <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Biomedical Engineering">
                    Biomedical Engineering
                  </SelectItem>
                  <SelectItem value="Business Administration">
                    Business Administration
                  </SelectItem>
                  <SelectItem value="Chemical Engineering">
                    Chemical Engineering
                  </SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Civil Engineering">
                    Civil Engineering
                  </SelectItem>
                  <SelectItem value="Classical Studies">
                    Classical Studies
                  </SelectItem>
                  <SelectItem value="Computer Engineering">
                    Computer Engineering
                  </SelectItem>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="Criminal Justice">
                    Criminal Justice
                  </SelectItem>
                  <SelectItem value="Dance">Dance</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Dentistry">Dentistry</SelectItem>
                  <SelectItem value="Economics">Economics</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Electrical Engineering">
                    Electrical Engineering
                  </SelectItem>
                  <SelectItem value="English Literature">
                    English Literature
                  </SelectItem>
                  <SelectItem value="Environmental Engineering">
                    Environmental Engineering
                  </SelectItem>
                  <SelectItem value="Environmental Science">
                    Environmental Science
                  </SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Fine Arts">Fine Arts</SelectItem>
                  <SelectItem value="Foreign Languages">
                    Foreign Languages
                  </SelectItem>
                  <SelectItem value="Forestry">Forestry</SelectItem>
                  <SelectItem value="Geology">Geology</SelectItem>
                  <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                  <SelectItem value="Health Sciences">
                    Health Sciences
                  </SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Hospitality Management">
                    Hospitality Management
                  </SelectItem>
                  <SelectItem value="Human Resources Management">
                    Human Resources Management
                  </SelectItem>
                  <SelectItem value="Information Systems">
                    Information Systems
                  </SelectItem>
                  <SelectItem value="International Relations">
                    International Relations
                  </SelectItem>
                  <SelectItem value="Journalism">Journalism</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                  <SelectItem value="Linguistics">Linguistics</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Mechanical Engineering">
                    Mechanical Engineering
                  </SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Occupational Therapy">
                    Occupational Therapy
                  </SelectItem>
                  <SelectItem value="Philosophy">Philosophy</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Political Science">
                    Political Science
                  </SelectItem>
                  <SelectItem value="Psychology">Psychology</SelectItem>
                  <SelectItem value="Public Health">Public Health</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Religious Studies">
                    Religious Studies
                  </SelectItem>
                  <SelectItem value="Social Work">Social Work</SelectItem>
                  <SelectItem value="Software Engineering">
                    Software Engineering
                  </SelectItem>
                  <SelectItem value="Sociology">Sociology</SelectItem>
                  <SelectItem value="Statistics">Statistics</SelectItem>
                  <SelectItem value="Sustainable Development">
                    Sustainable Development
                  </SelectItem>
                  <SelectItem value="Theatre">Theatre</SelectItem>
                  <SelectItem value="Veterinary Medicine">
                    Veterinary Medicine
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-2 flex-wrap">
              {signupInfo.major_interests.map((e, i) => (
                <div key={i} className="bg-[#e0af68] rounded-md px-2 py-1">
                  <p className="text-xs">{e}</p>
                </div>
              ))}
            </div>
            <h2 className="text-white font-bold mt-8">
              College budget (per year)
            </h2>
            <Slider
              defaultValue={[5000]}
              max={100000}
              step={500}
              onValueChange={(e) =>
                setSignupInfo({ ...signupInfo, college_budget: e[0] })
              }
              className=""
            />
            <p className="text-white text-xs">
              {formatter.format(signupInfo.college_budget)}
            </p>
            <h2 className="text-white font-bold mt-8">
              What states would you like to live?
            </h2>
            <Select
              onValueChange={(e) =>
                setSignupInfo({
                  ...signupInfo,
                  location: [...signupInfo.location, e],
                })
              }
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  <SelectItem value="Alabama">Alabama</SelectItem>
                  <SelectItem value="Alaska">Alaska</SelectItem>
                  <SelectItem value="Arizona">Arizona</SelectItem>
                  <SelectItem value="Arkansas">Arkansas</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Colorado">Colorado</SelectItem>
                  <SelectItem value="Connecticut">Connecticut</SelectItem>
                  <SelectItem value="Delaware">Delaware</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Hawaii">Hawaii</SelectItem>
                  <SelectItem value="Idaho">Idaho</SelectItem>
                  <SelectItem value="Illinois">Illinois</SelectItem>
                  <SelectItem value="Indiana">Indiana</SelectItem>
                  <SelectItem value="Iowa">Iowa</SelectItem>
                  <SelectItem value="Kansas">Kansas</SelectItem>
                  <SelectItem value="Kentucky">Kentucky</SelectItem>
                  <SelectItem value="Louisiana">Louisiana</SelectItem>
                  <SelectItem value="Maine">Maine</SelectItem>
                  <SelectItem value="Maryland">Maryland</SelectItem>
                  <SelectItem value="Massachusetts">Massachusetts</SelectItem>
                  <SelectItem value="Michigan">Michigan</SelectItem>
                  <SelectItem value="Minnesota">Minnesota</SelectItem>
                  <SelectItem value="Mississippi">Mississippi</SelectItem>
                  <SelectItem value="Missouri">Missouri</SelectItem>
                  <SelectItem value="Montana">Montana</SelectItem>
                  <SelectItem value="Nebraska">Nebraska</SelectItem>
                  <SelectItem value="Nevada">Nevada</SelectItem>
                  <SelectItem value="New Hampshire">New Hampshire</SelectItem>
                  <SelectItem value="New Jersey">New Jersey</SelectItem>
                  <SelectItem value="New Mexico">New Mexico</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="North Carolina">North Carolina</SelectItem>
                  <SelectItem value="North Dakota">North Dakota</SelectItem>
                  <SelectItem value="Ohio">Ohio</SelectItem>
                  <SelectItem value="Oklahoma">Oklahoma</SelectItem>
                  <SelectItem value="Oregon">Oregon</SelectItem>
                  <SelectItem value="Pennsylvania">Pennsylvania</SelectItem>
                  <SelectItem value="Rhode Island">Rhode Island</SelectItem>
                  <SelectItem value="South Carolina">South Carolina</SelectItem>
                  <SelectItem value="South Dakota">South Dakota</SelectItem>
                  <SelectItem value="Tennessee">Tennessee</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Utah">Utah</SelectItem>
                  <SelectItem value="Vermont">Vermont</SelectItem>
                  <SelectItem value="Virginia">Virginia</SelectItem>
                  <SelectItem value="Washington">Washington</SelectItem>
                  <SelectItem value="West Virginia">West Virginia</SelectItem>
                  <SelectItem value="Wisconsin">Wisconsin</SelectItem>
                  <SelectItem value="Wyoming">Wyoming</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-2 flex-wrap">
              {signupInfo.location.map((e, i) => (
                <div key={i} className="bg-[#e0af68] rounded-md px-2 py-1">
                  <p className="text-xs">{e}</p>
                </div>
              ))}
            </div>
            <h2 className="text-white font-bold mt-8">
              What what are your favorite sports?
            </h2>
            <Select
              onValueChange={(e) =>
                setSignupInfo({
                  ...signupInfo,
                  sports: [...signupInfo.sports, e],
                })
              }
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sports</SelectLabel>
                  <SelectItem value="Baseball">Baseball</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Bowling">Bowling</SelectItem>
                  <SelectItem value="Cross Country">Cross Country</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Golf">Golf</SelectItem>
                  <SelectItem value="Gymnastics">Gymnastics</SelectItem>
                  <SelectItem value="Ice Hockey">Ice Hockey</SelectItem>
                  <SelectItem value="Indoor Track & Field">
                    Indoor Track & Field
                  </SelectItem>
                  <SelectItem value="Lacrosse">Lacrosse</SelectItem>
                  <SelectItem value="Rifle">Rifle</SelectItem>
                  <SelectItem value="Soccer">Soccer</SelectItem>
                  <SelectItem value="Swimming & Diving">
                    Swimming & Diving
                  </SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Track & Field">Track & Field</SelectItem>
                  <SelectItem value="Volleyball">Volleyball</SelectItem>
                  <SelectItem value="Wrestling">Wrestling</SelectItem>

                  <SelectItem value="Beach Volleyball">
                    Beach Volleyball
                  </SelectItem>
                  <SelectItem value="Rowing">Rowing</SelectItem>
                  <SelectItem value="Sailing">Sailing</SelectItem>
                  <SelectItem value="Skiing">Skiing</SelectItem>
                  <SelectItem value="Squash">Squash</SelectItem>
                  <SelectItem value="Water Polo">Water Polo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-2 flex-wrap">
              {signupInfo.sports.map((e, i) => (
                <div key={i} className="bg-[#e0af68] rounded-md px-2 py-1">
                  <p className="text-xs">{e}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              <button
                className="self-start bg-[#7aa2f7] hover:bg-[#5673b2] px-2 py-1 rounded-md"
                onClick={() => setSignupState(0)}
              >
                Previous
              </button>
              <button
                className="self-start bg-[#9ece6a] hover:bg-[#628042] px-4 py-1 rounded-md"
                onClick={async () => {
                  console.log("here");
                  const response = await fetch(
                    "http://localhost:8080/api/auth/signup",
                    {
                      method: "POST",
                      body: JSON.stringify(signupInfo),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  console.log(response);
                  const token_pack = await response.json();

                  localStorage.setItem("token", token_pack.token);

                  setSignupInfo({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    major_interests: [],
                    college_budget: 5000,
                    location: [],
                    sports: [],
                  });

                  router.push("/");
                }}
              >
                Sign up
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
