'use client';
import React from 'react';
import { useState, Suspense } from 'react';
import { getData } from '@/app/api/getData';
import { caseData } from '@/app/definitions';
import DataGraph from './graph';
import { locations } from '../../../public/data';

function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
export default function SideBar(){
    const [city, setCity] = useState<string>("");
    const [days, setDays] = useState<string>("");
    const [data, setData] = useState<caseData[]>([]);
    const handleItemChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        const id = e.target.value;
        const itemObject = locations.find((element)=>element.id==id);
        if(itemObject) {
            setCity(itemObject.id);
        }
    }
    const handleButton = async ()=>{
        const apiResponse = await getData(city, days);
        setData(apiResponse);
    }
    return(
        <div className="flex h-screen flex-col md:flex-row md:overflow-auto">
            <div className="w-full flex-none md:w-1/4">
                <div className="flex h-full flex-col px-1 py-1">
                    <div className="h-full rounded-md bg-gray-50 p-4 md:p-6">
                        <div className="relative flex flex-1 flex-shrink-0">
                            <label className="peer block w-1/3 py-2 pl-2 text-sm">City</label>
                            <select
                                id="location"
                                name="location"
                                className="peer block w-2/3 cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="item-error"
                                onChange={handleItemChange}
                                >
                                    <option value="">
                                        Select city
                                    </option>
                                    {locations.length > 0 && locations.map((element) => (
                                        <option key={element.id} value={element.id}>{element.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="relative flex flex-1 my-2 flex-shrink-0">
                            <label className="peer block w-1/3 py-2 pl-2 text-sm">Days</label>
                            <input className="peer block w-2/3 rounded-md border border-gray-200 py-2 pl-2 text-sm" onChange={(e)=>setDays(e.target.value)}></input>
                        </div>
                        <div className="relative flex flex-1 my-5 flex-shrink-0">
                            <button className="peer block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={()=>handleButton()}>Get Data</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex-none md:w-3/4 md:overflow-y-auto hide-scroll" >
                <Suspense fallback={<Loading />}>
                    <DataGraph cases={data}/>
                </Suspense>
            </div>
        </div>
    )
};