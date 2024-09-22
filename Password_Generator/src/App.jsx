import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length , setlength] = useState(8)
  const [Number , setNumber] = useState(false)
  const [Char , setChar] = useState(false)
  const [Password , setPassword] = useState("")
  const passwordRef = useRef(null) 

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(Number) str += "123456789"
    if(Char) str += "[](){}':?/~!@#$%^&*"
    
    for(let i = 0; i < length; i++) {
      let elem = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(elem)
    }

    setPassword(pass)
    

  }, [length, Number, Char, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.select(0, 999)
    window.navigator.clipboard.writeText(Password)
  }, [Password])
  

  useEffect(() => {
    passwordGenerator()
  }, [length, Number, Char, passwordGenerator])

  

  return (
    <>
      <div className='w-full p-2 text-white fixed top-20 flex flex-wrap justify-center items-center'>
        <div className='p-5 bg-gray-600 rounded-lg border-2 border-blue-500'>
          <h1 className='text-orange-500 text-center mb-4'>Password Generator</h1>
          <input 
          placeholder='Password'
          value={Password}
          type="text" 
          readOnly
          ref={passwordRef}
          className='text-orange-500 outline-none px-3 bg-slate-100 rounded-md w-full h-8'
          />
          <button
          onClick={copyPasswordToClipboard}
          className='bg-blue-600 w-full mt-2 text-white px-2 py-1 rounded-md shrink-0'>Copy</button>

          <div className='w-full mt-4'>
            <input 
            className='cursor-pointer'
            type="range" 
            id="Length" 
            min={8}
            max={100}
            value={length}
            onChange={(e) => setlength(e.target.value)}
            />
            <label htmlFor="Length" className=' text-sm text-orange-500 px-2'>Length:  {length}</label>


            <input 
            type="checkbox" 
            id="number" 
            className='px-2'
            defaultChecked= {Number}
            onChange={() => {
              setNumber((prev) => !prev)
            }}
            />
            <label htmlFor="number" className='text-orange-500 px-2 text-sm'>Number</label>
            <input 
            type="checkbox" 
            id="Character" 
            className='px-2'
            defaultChecked= {Char}
            onChange={() => {
              setChar((prev) => !prev)
            }}
            />
            <label htmlFor="Character" className='text-orange-500 px-2 text-sm'>Character</label>
          </div>
          

        </div>
      </div>
    </>
  )
}

export default App
