
import React, { useState } from 'react'
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { SupabaseEmp } from '../supabase/supabase';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';

const Cat_Items = ({ data }) => {
   // console.log(data);

    const offerId = data.offer_uid
    const [bookmark, setBookmark] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth();

    useEffect(() => {

        checkSaved();


/* ---------------------------------- Saved Products Data Fetched here ------------------------------ */


        async function checkSaved(){

            const { data:dataa, error } = await SupabaseEmp
                .from('save_collection')
                .select()
                .eq("offer_uid", data.offer_uid)
                .eq("emp_id", user.id)
                if (dataa.length) {
                    setBookmark(true)
                   // console.log(dataa);
                    
                }
        }



    }, [])

    async function addToSave(e) {
        if (e === "checked") {
           // console.log(data);
            const { error } = await SupabaseEmp
                .from("save_collection")
                .insert(
                    {
                        offer_uid: data.offer_uid,
                        offer_img: data.offer_img,
                        brand_img: data.brand_img,
                        brand_name: data.brand_name,
                        offer_detail: data.offer_detail,
                        validity: data.validity,
                        cate_uid: data.cate_uid,
                        cate_name: data.cate_name,
                        emp_id: user.id


                    }
                )
            if (error) {
                console.log(error);

            }
        } else {

            const { error } = await SupabaseEmp
                .from('save_collection')
                .delete()
                .eq("offer_uid", data.offer_uid)
                .eq("emp_id", user.id)
            if (error) {
                console.log(error);

            }

        }
    }


    return (
        <div className='w-[330px] h-[480px] rounded-2xl overflow-hidden shadow-lg'>

            <div className="top w-full h-[200px] bg-[#FAE072] overflow-hidden flex justify-center items-center">
                <img className='duration-200 hover:scale-125' src={data.offer_img} alt="" />
            </div>

            <div className='w-[92px] h-[92px] bg-[#D9D9D9] shadow-md rounded-lg relative -top-14 left-5 overflow-hidden flex justify-center items-center'>
                <img className='duration-200 hover:scale-125' src={data.brand_img} alt="" />
            </div>

            {
                bookmark ?
                    <button id='checked' onClick={(e) => { setBookmark(false); addToSave("unChecked") }} type='button'>
                        <BsBookmarksFill className='relative left-[280px] -top-20 text-3xl text-gray-600' />
                    </button>
                    :
                    <button id='unChecked' onClick={(e) => { setBookmark(true); addToSave("checked") }} type='button'>
                        <BsBookmarks className='relative left-[280px] -top-20 text-3xl text-gray-600' />
                    </button>
            }
            <div className='px-8'>
                <h1 className='font-semibold text-lg -mt-14'>{data.brand_name}</h1>
                <p className='font-light text-sm mt-4'>{data.offer_detail}</p>
               <Link to={`/details/${data.offer_uid}`}>   <button type='button'  className='w-[200px] h-11 mt-6 text-white bg-[#4C3CCE] rounded-md'>Offer Details</button>   </Link>  
                <p className='font-light text-sm mt-6'>Valid  {data.validity}</p>
            </div>

        </div>
    )
}

export default Cat_Items