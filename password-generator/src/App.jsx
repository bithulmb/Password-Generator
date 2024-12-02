import { useEffect } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useState } from "react"

export default function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i=1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-3xl font-bold mb-4  text-center text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3 placeholder:" 
          placeholder="password" 
          readOnly 
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input type="range" min={8} max={20} value={length} className="cursor-pointer" name="" id="" onChange={(e) => setLength(e.target.value)} /> 
              <label htmlFor="length"> Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={numberAllowed}  name="" id="" onChange={() => setNumberAllowed((prev) => !prev)} /> 
              <label htmlFor="number">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={charAllowed}  name="" id="" onChange={() => setCharAllowed((prev) => !prev)} /> 
              <label htmlFor="character">Characters</label>
            </div>
        </div>
    </div>
  )
}