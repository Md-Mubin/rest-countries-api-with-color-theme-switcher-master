"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { countryDataApi } from '../../data'
import { selectedCountryData } from '@/store/Slices/countrySlice'

const CountryInfoCompo = () => {

    const dispatch = useDispatch()
    const [borderCountryData, setBorderCountryData] = useState([])

    const selectedMapData = useSelector((state) => state.countryData)

    // storig and reDispatching redux from localStorage on first mount
    useEffect(() => {
        if (typeof window === "undefined") return // SSR guard

        const localData = localStorage.getItem("countryData")
        if (localData) {
            const parsed = JSON.parse(localData)
            
            if (!selectedMapData || selectedMapData.length === 0) {
                dispatch(selectedCountryData(parsed))
            }
        }
    }, [])

    // ======== use effect uses
    useEffect(() => {
        if (!selectedMapData || !Array.isArray(selectedMapData.borders)) return

        const relatedCountries = countryDataApi.filter((item) =>
            selectedMapData.borders.includes(item?.alpha3Code)
        )

        setBorderCountryData(relatedCountries)

    }, [selectedMapData])

    return (
        <>
            <section className='pt-40'>
                <div className="container">
                    <div className='flex items-center justify-between gap-10 flex-col lg:flex-row'>

                        {/* flag */}
                        {selectedMapData?.flags?.svg && (
                            <img src={selectedMapData?.flags?.svg} loading='lazy' alt="country flag image" className='w-[400px] xl:w-[600px]' />
                        )}

                        <div className='lg:w-[750px]'>

                            {/* name */}
                            <h2 className='font-semibold text-4xl dark:text-[#fff] tracking-widest'>
                                {selectedMapData?.name}
                            </h2>

                            <ul className='my-10 flex flex-col flex-wrap gap-2 sm:h-[180px] text-lg dark:text-[#fff] font-normal'>
                                <li>Native Name: {selectedMapData?.nativeName}</li>
                                <li>Population: {selectedMapData?.population}</li>
                                <li>Region: {selectedMapData?.region}</li>
                                <li>Sub Region: {selectedMapData?.subregion}</li>
                                <li>Capital: {selectedMapData?.capital}</li>
                                <li>Top Level Domain: {selectedMapData?.topLevelDomain}</li>
                                <li>Currencies: {selectedMapData?.currencies ? selectedMapData?.currencies.map((items) => items.name) : "N/A"}</li>
                                <li>Languages: {selectedMapData?.languages ? selectedMapData?.languages.map((items) => items.name).join(', ') : "N/A"}</li>
                            </ul>

                            {/* border countries */}
                            <ul className='flex items-center flex-wrap gap-4'>
                                <li className='w-[210px] font-semibold text-2xl dark:text-[#fff]'>Border Countries: </li>
                                {
                                    borderCountryData.length > 0 ? (
                                        borderCountryData.map((datas, index) => (
                                            <li key={index} className='px-4 py-2 bg-[#] tracking-widest dark:text-[#fff] ring rounded-md hover:bg-[#40404e] duration-200'>
                                                {datas?.name}
                                            </li>
                                        ))
                                    ) : (
                                        <p className='px-4 py-2 bg-[#] tracking-widest dark:text-[#fff] ring rounded-md hover:bg-[#40404e] duration-200'>No Data Found</p>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CountryInfoCompo