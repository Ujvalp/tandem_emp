import React, { useEffect, useState } from 'react'
import Cat_Nav from '../components/Cat_Nav'
import { NavLink, useNavigate } from 'react-router-dom'
import Search_Items from '../components/Search_Items'
import { useAuth } from '../context/AuthProvider'
import { setItemAsync } from '@supabase/gotrue-js/dist/module/lib/helpers'
import { SupabaseOffers } from '../supabase/supabaseOffer'

const Search_Results = () => {
    const [searchedData,setSearchedData]=useState([])
    const [datafound,setDataFound] = useState(true)
    const [nodatafound,setNoDataFound] = useState(true)
   const {searchInput,setSearchInput,render}=useAuth()
   const navigate = useNavigate();
    useEffect(()=>{
        if (!searchInput ){
            navigate("/")
            
        }
       fetchSearchedData();
       async function fetchSearchedData(){
       
        const { data, error } = await SupabaseOffers
        .from('offer_detail')
        .select()
        .textSearch("fts", searchInput)
        if (data) {
            setSearchedData(data)
            setSearchInput("")
            setNoDataFound(!nodatafound)
            //console.log(data);
        }else{
            console.log(error);
        }
       }

    },[render])
    return (
        <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center bg-gray-200'>
            <div className='max-w-[1180px] w-full min-h-full px-8 py-5 flex flex-col gap-5'>
                <h1 className='text-xl font-medium ml-8'>{searchedData.length && datafound? "Results": !searchedData.length && !nodatafound? "No data found":""}</h1>

                <section className='bg-white w-full h-full rounded-lg md:pb-56 py-8 px-10 space-y-12'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {searchedData.map((item,index)=>(

                    <Search_Items

                        key={index}
                        data={item}
                    />
                    ))}
                        
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Search_Results