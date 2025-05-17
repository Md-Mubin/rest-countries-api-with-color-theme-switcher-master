import React, { useState } from 'react'

const Navbar = () => {

    // use state
    const [toggle,setToggle] = useState(false)

    // dark/light toggle button
    const modeToggle = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        }
    }

    return (
        <>
            <nav className='py-6 bg-slate-500 dark:bg-[#1d1d29] sticky top-0 z-[100]'>
                <div className="container">
                    <ul className='flex justify-between items-center'>
                        <li>
                            <h1 className='font-semibold text-2xl lg:text-4xl text-[#fff]'>Where in the world?</h1>
                        </li>
                        <li>
                            <button onClick={modeToggle} className='dark font-medium text-[12px] sm:text-lg lg:text-2xl text-[#fff]'>
                                Dark Mode
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar