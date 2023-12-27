import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [withNumber, setWithNumber] = useState(false);
  const [withChar, setWithChar] = useState(false);
  const [password, setPassword] = useState();


  //useCallback hook is useful for function to get stored in cache to use the function again in between re-render.
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (withNumber) str += "0123456789";
    if (withChar) str += "`~!@#$%^&*()-+={}[]";

    for (let i = 1; i <= length; i++) {
      let randormIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randormIndex);
    }
    setPassword(pass)
  }, [length, withNumber, withChar, setPassword])


  //useEffect is useful if something gets change in the following array then re-run the first parameter in useEffect.
  useEffect(() => {
    passwordGenerator()
  }, [length, withNumber, withChar, passwordGenerator])


  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 15);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-centergap-x-1">
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={withNumber}
              id="numberInput"
              onChange={() => setWithNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={withChar}
              id="charInput"
              onChange={() => setWithChar((prev) => !prev)} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
