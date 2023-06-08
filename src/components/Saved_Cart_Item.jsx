import React, { useState } from 'react'
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { SupabaseEmp } from '../supabase/supabase';
import Loading from './Loading';

const Saved_Cart_Item = ({ collectionData, render, setRender,renderCateName,setRenderCateName }) => {

    const [bookmark, setBookmark] = useState(true)
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const {user}=useAuth();

    async function removeSaved(id) {
        if (id === "unChecked") {
            setLoading(true)

            const { error } = await SupabaseEmp
                .from('save_collection')
                .delete()
                .eq('offer_uid', collectionData.offer_uid)
                .eq("emp_id",user.id)
                if(!error){
                    //console.log("deleted");
                    setTimeout(()=>{
                        localStorage.removeItem("selectedCategoryId")

                        setBookmark(false)
                        setRender(!render)
                        setRenderCateName(!renderCateName)
                        setLoading(false)
                    },700)
                }else{
                    console.log(error);
                }

        }

    }

    // console.log(collectionData.offer_uid);


    return (
        <div className='w-[330px] h-[480px] rounded-2xl overflow-hidden shadow-lg'>

            <div className="top w-full h-[200px] bg-[#FAE072] overflow-hidden flex justify-center items-center">
                <img className='duration-200 hover:scale-125' src={collectionData.offer_img} alt="" />
            </div>

            <div className='w-[92px] h-[92px] bg-[#D9D9D9] shadow-md rounded-lg relative -top-14 left-5 overflow-hidden flex justify-center items-center'>
                <img className='duration-200 hover:scale-125' src={collectionData.brand_img} alt="" />
            </div>

            {
                bookmark ?
                    <button onClick={(e) => {  removeSaved("unChecked") }} type='button'>
                        <BsBookmarksFill className='relative left-[280px] -top-20 text-3xl text-gray-600' />
                    </button>
                    :
                    <button onClick={(e) => { setBookmark(true); removeSaled("checked") }} type='button'>
                        <BsBookmarks className='relative left-[280px] -top-20 text-3xl text-gray-600' />
                    </button>
            }
            <div className='px-8'>
                <h1 className='font-semibold text-lg -mt-14'>{collectionData.brand_name}</h1>
                <p className='font-light text-sm mt-4'>{collectionData.offer_detail}</p>
            <Link to={`/details/${collectionData.offer_uid} `}>    <button  type='button' className='w-[200px] h-11 mt-6 text-white bg-[#4C3CCE] rounded-md'>Offer Details</button> </Link>
                <p className='font-light text-sm mt-6'>{collectionData.validity}</p>
            </div>

        </div>
    )
}

export default Saved_Cart_Item