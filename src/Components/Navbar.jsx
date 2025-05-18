import React, { useEffect, useState } from 'react'
import { GoSun, GoMoon } from "react-icons/go";

const Navbar = () => {

    // use state
    const [theme, setTheme] = useState("dark")

    // use effet for dark/light mode
    useEffect(() => {
        if (localStorage.theme === "dark" || (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setTheme("dark")
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light")
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // dark/light toggle button
    const modeToggle = () => {
        if(theme === "dark") {
            document.documentElement.classList.remove("dark")
            localStorage.theme = "light"
            setTheme("light")
        } else {
            document.documentElement.classList.add("dark")
            localStorage.theme = "dark"
            setTheme("dark")
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
                            <button onClick={modeToggle} className='dark font-medium text-sm sm:text-lg lg:text-2xl text-[#fff] cursor-pointer flex items-center flex-col-reverse sm:flex-row sm:gap-4'>
                                {
                                    theme === "dark" ? <GoSun/> : <GoMoon/>
                                }
                                {
                                    theme === "dark" ? "Light Mode" : "Dark Mode"
                                }
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar