"use client"
import React, { useEffect, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { useDispatch } from 'react-redux';
import { countryDataApi } from '../../data';
import { selectedCountryData } from '@/store/Slices/countrySlice';
import { useRouter } from 'next/navigation';

const HomeCompo = () => {

    // ======== dispatch
    const dispatch = useDispatch()
    
    // ======== router navigation
    const router = useRouter()

    // ======== All Hooks 
    const [datas, setDatas] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("All")
    const [show, setShow] = useState(false)

    // ======== use effect uses
    useEffect(() => {
        let filtered = [...countryDataApi]

        // dropdown filter 
        if (selectedRegion !== "All") {
            filtered = filtered.filter(item => item.region === selectedRegion);
        }

        // input search filter
        if (inputSearch.trim() !== "") {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(inputSearch.toLowerCase())
            )
        }
        setDatas(filtered)
    }, [inputSearch, selectedRegion])

    // ======== for unique regions in dropdown
    const uniqueRegions = ["All", ...new Set(countryDataApi.map(item => item.region))]

    // ======== handleing card information
    const handleCards = (selectedCardDatas)=>{
        dispatch(selectedCountryData(selectedCardDatas))
        localStorage.setItem("countryData", JSON.stringify(selectedCardDatas))
        router.push("/country")
    }

    return (
        <>
            <section>
                <div className="container">

                    {/* ======================== search and drop down filter area ======================== */}
                    <div className='py-8 flex justify-between items-center flex-col sm:flex-row gap-8 sm:gap-0'>
                        <div>
                            <input
                                type="text"
                                placeholder='...search'
                                onChange={(e) => setInputSearch(e.target.value)}
                                className='md:w-[450px] xl:w-[800px] p-2 border-b-2 border-[#7e7e7e] outline-none text-[#2b2b2b] dark:text-[#f0f0f0] placeholder:text-[#7e7e7e] tracking-widest' />

                        </div>
                        <div className='relative'>
                            <button onClick={() => setShow(!show)} className='font-medium text-lg text-[#000] dark:text-[#a7afba] bg-[#1b1b1b33] dark:bg-[#7e7e7e33] px-8 py-2 rounded-xl flex items-center gap-3 hover:bg-[#1d1d29] hover:text-[#fff] duration-200 cursor-pointer'>
                                Filter by Region <SlArrowDown className={`duration-200 ${show && "rotate-[-180deg]"}`} />
                            </button>

                            <ul className={`absolute bg-[#a7afba] dark:bg-[#3b3b47] top-14 w-full rounded-xl z-[100] text-[#fff] transition-[height, padding] ease-in-out duration-300 overflow-hidden h-0 py-0 ${show && "h-[380px] py-2"}`}>
                                {
                                    uniqueRegions.map((region, index) => (
                                        <li
                                            key={index}
                                            onClick={() => { setSelectedRegion(region), setShow(false) }}
                                            className={`py-2 px-5 cursor-pointer hover:bg-[#1d1d29] duration-200 ${selectedRegion === region ? "bg-[#1d1d29]" : ""}`}>
                                            {region}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>

                    {/* ======================== all flags area ======================== */}
                    <div className='flex justify-around lg:justify-between flex-wrap gap-6'>
                        {
                            datas.length > 0 ? (
                                datas.map((items, index) => (
                                    <ul onClick={()=>handleCards(items)} key={index} className='w-full md:w-[320px] lg:w-[300px] xl:w-[360px] bg-slate-500 dark:bg-[#3e3e50] rounded-lg overflow-hidden group md:hover:grow duration-200 cursor-pointer'>
                                        <li>
                                            <img loading='lazy' className='h-[200px] w-full object-cover' src={items.flags.svg} alt="flag image" />
                                        </li>
                                        <li className='p-8 text-[#f0f0f0] tracking-widest'>
                                            <h3 className='w-[300px] mb-5 font-semibold text-xl md:group-hover:scale-[1.3] origin-left duration-200 will-change-transform'>{items?.name ? items?.name : "No Data Found"}</h3>
                                            <p className='text-sm font-light md:group-hover:scale-[1.3] origin-left duration-200 will-change-transform'>Population: {items?.population ? items?.population : "No Data Found"}</p>
                                            <p className='text-sm font-light mt-1 md:group-hover:scale-[1.3] origin-left duration-200 will-change-transform'>Region: {items?.region ? items?.region : "No Data Found"}</p>
                                            <p className='text-sm font-light mt-1 md:group-hover:scale-[1.3] origin-left duration-200 will-change-transform'>Capital: {items?.capital ? items?.capital : "No Data Found"}</p>
                                        </li>
                                    </ul>
                                ))
                            ) : (
                                <h2 className='font-normal text-3xl text-[#fff] tracking-widest animate-pulse'>Sorry, No Country Found!</h2>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeCompo