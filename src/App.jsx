import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-=_+'";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const passwordRef = useRef(null);
  const copyToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div
        className="fixed h-screen w-full"
        style={{ backgroundColor: "black" }}
      >
        <div className="min-h-fit my-40 mx-40 px-5 py-10 rounded-2xl bg-gray-700">
          <div className="text-white text-center text-3xl my-2 py-5">
            Password Generator
          </div>
          <div className="py-5">
            <input
              type="text"
              placeholder="Password"
              value={password}
              className=" outline-none rounded-md rounded-r-none px-2 py-2 my-2 w-52"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyToClipboard}
              className="outline-none rounded-l-none px-2 py-2 text-white rounded-md"
              style={{ backgroundColor: "darkcyan" }}
            >
              Copy
            </button>
          </div>
          <div>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="my-3"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="rounded-md  text-md text-white shadow-md">
              {" "}
              Length:{length}
            </label>
            <input
              onChange={() => {
                setNumAllowed((prev) => {
                  return !prev;
                });
              }}
              type="checkbox"
              defaultChecked={numAllowed}
              className="ml-4"
            />
            <label className="rounded-md py-1 text-md text-green-500 shadow-md">
              {" "}
              Numbers
            </label>

            <input
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              type="checkbox"
              defaultChecked={charAllowed}
              className="ml-4"
            />
            <label className="rounded-md py-1 text-md text-green-500 shadow-md">
              {" "}
              Special Chars
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
