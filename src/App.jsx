import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

function App() {

  const [length, setLength] = useState(10);
  const [numsCheck, setNumCheck] = useState(false);
  const [charCheck, setCharCheck] = useState(false);
  const [password, setPassword] = useState('');
  const passref = useRef(null);
  const [showNotification, setShowNotification] = useState(false);

  const pswdGen = useCallback(() => {

    let password = '';
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numset = '0123456789';
    let special = '!@#$%^&_[*+-=].{_}~';

    if (numsCheck) {
      charset += numset;
    }
    if (charCheck) {
      charset += special;
    }

    for (let i = 0; i < length; i++) 
    {
      let charpos = Math.floor(Math.random() * charset.length + 1);
      password += charset.charAt(charpos);
    }
    setPassword(password);

  }, [length, numsCheck, charCheck]);

  const PassCopy = useCallback(() => {
    passref.current.select();
    window.navigator.clipboard.writeText(password);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2200); 
  },[password]);


  useEffect(() => {pswdGen()}, [length, numsCheck, charCheck, pswdGen]);


  return (
    <>
      <div className="text-3xl font-serif text-center m-10">Password Generator</div>

      <div className=" shadow-md bg-slate-800 rounded-2xl p-4 m-8 text-center text-white">
        Generates a random password based on the length and options selected.

        <div className="flex " id="up">
          <input type="text" value={password} placeholder='Password' ref={passref}
            className="w-full bg-amber-50 m-6 p-3 text-gray-800 rounded-lg" readOnly />
          <button className="bg-pink-400 m-6 p-3 rounded-lg text-black cursor-pointer"
          onClick={PassCopy} > Copy </button>
        </div>

        <div className="flex gap-8" id="dwn">
          <input type="range" value={length} min="5" max="50"
            onChange={(e) => setLength(e.target.value)}
            className="bg-amber-50 m-2 text-gray-600 rounded-lg cursor-pointer" />
          <label className='w-10'>Length: {length}</label>

          <div className='pl-10'>
          <input type="checkbox" defaultChecked={numsCheck} id='nums'
           onChange={() => setNumCheck((prev) => !prev)} />
          <label className='pl-2'>Include Numbers</label>
          </div>

          <div>
          <input type="checkbox" defaultChecked={charCheck} id='chars'
          onChange={(e) => setCharCheck((prev) => !prev)} />
          <label className='pl-2'>Include Characters</label>
          </div>

        </div>
          <button className="bg-pink-400 m-6 p-3 rounded-lg text-black cursor-pointer" onClick={pswdGen}> ReGenerate </button>
      </div>
      

	 {showNotification && (
		<div className="fixed inset-x-0 bottom-10 flex items-center justify-center">
			<div className="bg-green-500 text-white p-3 border-1 border-amber-50 rounded-lg shadow-lg">
				Password copied to clipboard!
			</div>
	   </div>
      )}

    </>
  )
}

export default App