import React, { useEffect, useState } from 'react'

const DarkMode = ({ children }) => {
const [darkMode, setDarkMode] = useState(()=>{
    return localStorage.getItem("theme") === "dark";
});
useEffect(()=>{
    if(darkMode){
        document.documentElement.classList.add('dark')
        localStorage.setItem("theme", "dark");
    }else{
        document.documentElement.classList.remove('dark')
        localStorage.setItem("theme", "light");
    }
}, [darkMode])
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-dark dark:text-white text-end transition-colors duration-300'>
      <button className='p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded m-2' onClick={()=>{setDarkMode(!darkMode)}}>
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="container mx-auto text-center text-3xl font-[900]">{children}</div>
    </div>
  )
}

export default DarkMode