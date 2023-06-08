import React, { useRef } from 'react'
import Cat_Nav from '../components/Cat_Nav'
import { Link, NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import Cat_Items from '../components/Cat_Items'
import { useEffect } from 'react'
import { SupabaseOffers } from '../supabase/supabaseOffer'
import { useState } from 'react'
import { BsReplyAllFill } from 'react-icons/bs'
import Loading from '../components/Loading'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Products = () => {
    const { catId } = useParams()
    const { cateName } = useParams()
    const [productdetail, setProductdetail] = useState([])
    const [mounted, setMounted] = useState(true);
    const [offerdetail, setOfferdetail] = useState([])
    const [render, setRender] = useState(true)
    const navigate = useNavigate();
    const [allNav, setAllNav] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false)
    
    // localStorage.setItem("categoryId",catId)





    useEffect(() => {
      
        offerfetch();
    }, [render])


    async function offerfetch() {
    
            setLoading(true)
            const { data, error } = await SupabaseOffers
                .from('offer_detail')
                .select()
                .eq('cate_uid', catId)

            if (data) {
                // setOfferdetail("")
                setTimeout(() => {
                    setOfferdetail(data)
                    setLoading(false)
                }, 500)
                // console.log(data);

            }

            else {
                console.log(error);
            }

        }

    

    // async function fetchSubCatData(id) {
    //     localStorage.setItem("categoryId", id)
    //     setRender(!render)
    // }



    // let scrl = useRef(null);
    // const [scrollX, setscrollX] = useState(0);
    // const [scrolEnd, setscrolEnd] = useState(false);

    // //Slide click
    // const slide = (shift) => {
    //     scrl.current.scrollLeft += shift;
    //     setscrollX(scrollX + shift);

    //     if (
    //         Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
    //         scrl.current.offsetWidth
    //     ) {
    //         setscrolEnd(true);
    //     } else {
    //         setscrolEnd(false);
    //     }
    // };

    // const scrollCheck = () => {
    //     setscrollX(scrl.current.scrollLeft);
    //     if (
    //         Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
    //         scrl.current.offsetWidth
    //     ) {
    //         setscrolEnd(true);
    //     } else {
    //         setscrolEnd(false);
    //     }
    // };




    return (
        <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center bg-gray-200'>
            {loading && <Loading />}
            <div className='max-w-[1180px] w-full min-h-full px-8 py-5 flex flex-col gap-5'>
                <h1 className='text-xl font-medium ml-8'>Employee Discount in {cateName} </h1>

                <section className='bg-white w-full h-full rounded-lg md:pb-56 py-8 px-10 space-y-12'>
                   
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {offerdetail.map((items, index) => (
                            <div key={items.id}>

                                <Cat_Items data={items} />

                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Products