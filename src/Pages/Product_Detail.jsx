import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import { SupabaseOffers } from '../supabase/supabaseOffer';
import { SupabaseEmp } from '../supabase/supabase';
import { useAuth } from '../context/AuthProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import ReactPlayer from 'react-player/youtube'


const Product_Detail = () => {

  const { offerId } = useParams()

  const { user } = useAuth()
  const [text, setText] = useState('');
  const [offerdetail, setOfferdetail] = useState('')
  const [termcond, setTermCond] = useState([])
  const [pop, setPop] = useState(false)
  const [confPop, setConfPop] = useState(false)
  const [videoPop, setVideoPop] = useState(false)
  const [amount, setAmount] = useState(0)
  const [hidebutton, setHideButton] = useState(false)
  const [couponToggle, setCouponToggle] = useState(false)
  const [copyMsg, setCopyMsg] = useState(true)
  const elementRef = useRef(null);


  useEffect(() => {

    offerdetailfetch();
    term_cond_fetch();

    /* ------------------------------------ Offer Details Data fetched here ------------------------------- */

    async function offerdetailfetch() {

      const { data, error } = await SupabaseOffers
        .from('offer_detail')
        .select()
        .single()
        .eq('offer_uid', offerId)

      if (data) {
        setOfferdetail(data)
        // console.log(data);
      }

      else {
        console.log(error);
      }

    }
  }, [])

  //---------------------------------------term & condition fetch-------------------------------------//
  async function term_cond_fetch() {

    const { data, error } = await SupabaseOffers
      .from('offer_detail')
      .select()
      .eq('offer_uid', offerId)

    if (data) {
      setTermCond(data)
      // console.log(data);
    }

    else {
      console.log(error);
    }

  }


  /* ------------------------------------ Offer Details Data fetched Above ------------------------------- */


  async function handleSubmit(e) {
    e.preventDefault();
    savingHitoryfetch();

    async function savingHitoryfetch() {
      const { data, error } = await SupabaseEmp
      .from('emp_saving_history')
      .select()
      .eq('emp_id', user.id)
      .eq('brand_uid', offerdetail.brand_uid)


      if(data.length){
        console.log("coupon already generated");
        // console.log(data);
        setConfPop(true)
      }

      else{
        const { data, error } = await SupabaseEmp
      .from('emp_saving_history')
      .insert({
        emp_id: user.id,
        purchase_amount: amount,
        saving_amount: savings,
        discount: offerdetail.discount,
        generated_code: offerdetail.coupon_code,
        brand_uid:offerdetail.brand_uid


      })

    if (!error) {
      console.log("Sucess");
    }

    else {
      console.log(error);
    }

    setPop(false);
    setAmount(0);
    setText(offerdetail.coupon_code);
    setHideButton(true)
    setCouponToggle(true)

      }


    }  }



    async function updateHandleSubmit(e) {
      e.preventDefault();

      const { data, error } = await SupabaseEmp
      .from('emp_saving_history')
      .update({
        emp_id: user.id,
        purchase_amount: amount,
        saving_amount: savings,
        discount: offerdetail.discount,
        generated_code: offerdetail.coupon_code,
        brand_uid:offerdetail.brand_uid
      })
      .eq('emp_id', user.id)
      .select()


      if(data){
        console.log("sucessfully updated");
        setConfPop(false)
        // console.log(data);
      }
      else{
        console.log(error);
      }

    setPop(false);
    setAmount(0);
    setText(offerdetail.coupon_code);
    setHideButton(true)
    setCouponToggle(true)
    }


 



  const inputHandler = event => {
    setText(event.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value)
  }

  let savings = (offerdetail.discount * amount) / 100

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    // alert('Code copied');
  }

  return (
    <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center md:pb-56 bg-white'>
      <div className='max-w-[920px] w-full min-h-full px-8 py-20 flex flex-col gap-10'>
        <section className='flex items-center gap-10'>
          <div className='w-[120px] h-[120px] bg-[#D9D9D9] overflow-hidden rounded-lg flex justify-center items-center'>
            <img src="https://source.unsplash.com/400x400/?cat,water" alt="" />
          </div>

          <div className='flex flex-col gap-3'>
            <h1 draggable= {true} className='text-2xl font-semibold'> {offerdetail.brand_name} </h1>
            <p className='font-light text-xl'>{offerdetail.offer_detail}% Off </p>
          </div>
        </section>

        <section className='h-[200px] w-full bg-[#FAE072] rounded-lg overflow-hidden flex justify-center items-center'>
          <img src="https://source.unsplash.com/1400x1400/?cat,water" alt="" />
        </section>

        <p className='font-light text-lg'>{offerdetail.offer_detail}% Off </p>



        <section className='flex flex-col gap-2'>
          <h1 className='text-xl font-semibold'>Validity</h1>
          <p className='font-light text-lg'> {offerdetail.validity} </p>
        </section>

        <section className='flex flex-col gap-2'>
          <div className='flex items-center'>
            <h1 className='text-xl font-semibold'>Redemption Link</h1>
            <p href={offerdetail.video_link} onClick={() => setVideoPop(true)} className='underline cursor-pointer font-light text-sm ml-2'>
              See how it works
            </p>


            {/*----------------------------------------- Video Popup ------------------------------------------------*/}
            {
              videoPop &&
              <section className='fixed -top-[160px] z-50 left-0 min-w-full min-h-[calc(100vh)] mt-40 bg-gray-100/70 flex justify-center items-center'>
                <div className='flex gap-1'>
                  <div className='w-fit h-fit rounded-lg overflow-hidden flex'>
                    <ReactPlayer playing={true} controls url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                  </div>

                  <CgClose onClick={() => setVideoPop(false)} className='text-gray-600 cursor-pointer text-xl font-extrabold' />
                </div>
              </section>
            }

          </div>
          <a href={offerdetail.redeem_link} className='font-light text-lg text-blue-600 hover:underline'>{offerdetail.redeem_link} </a>
        </section>

        <section className='flex flex-col gap-2'>
          <h1 className='text-xl font-semibold'>Store Direction Link</h1>
          <a href={offerdetail.location_link} className='font-light text-lg text-blue-600 hover:underline'>{offerdetail.location_link} </a>
        </section>

        <section className='flex flex-col gap-6'>
          <h1 className='text-xl font-semibold'>Generate Redeem Code</h1>
          <div className='flex gap-4'>
            <button type='button' hidden={hidebutton} onClick={() => { setPop(true) }} className='w-[360px] py-2 bg-black text-white'>Generate</button>
            {couponToggle &&

              <CopyToClipboard text={text}>
                <div className='flex gap-3'>
                  <input value={text} onChange={inputHandler} ref={elementRef} readOnly className='w-[280px] py-2 border border-blue-600 border-dashed text-center text-blue-600 outline-none' />
                  <button type='button' onClick={() => { copy; setCopyMsg(false); setTimeout(() => { setCopyMsg(true) }, 5000) }} disabled={!text} className='flex flex-flex-row gap-2 justify-center items-center w-[160px] py-2 bg-black disabled:bg-gray-400 disabled:text-black text-white'> {copyMsg ? <MdContentCopy className='' /> : <GiCheckMark />} {copyMsg ? "Copy" : "Copied!"}  </button>
                </div>
              </CopyToClipboard>
            }
          </div>
        </section>

        <section className='flex flex-col gap-2'>
          <h1 className='text-xl font-semibold'>Terms and Conditions</h1>

          <ul className='list-disc text-gray-500 px-4'>
            {termcond.map((paragraph) => (
              paragraph.term_cond.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
              ))
            ))}

          </ul>
        </section>

      </div>
      {
        confPop &&
        <section className='fixed -top-[160px] z-50 left-0 min-w-full min-h-[calc(100vh)] mt-40 bg-gray-100/90 flex flex-col justify-center items-center'>
          <form onSubmit={updateHandleSubmit} className='w-[460px] h-fit bg-white drop-shadow-md rounded-lg px-16 py-12 grid grid-cols-2 gap-5'>
            <h1 className='col-span-2 text-gray-800 font-medium text-lg'>Code has been already generated. <br /> Do you want to generate again?</h1>
            
            <button type='submit'  className='w-full rounded-md py-2 bg-black hover:bg-slate-900 text-white'>Yes</button>
            <button type='button' onClick={() => { setConfPop(false); }} className='w-full rounded-md py-2 bg-gray-200 hover:bg-gray-300 border border-gray-400'>No</button>

          </form>
        </section>
      }
      
      {
        pop &&
        <section className='fixed -top-[160px] z-40 left-0 min-w-full min-h-[calc(100vh)] mt-40 bg-gray-100/90 flex flex-col justify-center items-center'>
          <form onSubmit={handleSubmit} className='w-[460px] h-[520px] bg-white drop-shadow-md rounded-lg px-20 flex flex-col gap-4'>
            <h1 className='text-gray-400 text-center mt-16 text-lg'>Generate code</h1>
            <p className='text-gray-400 mt-4'>Purchase amount :</p>
            <input type="number" onChange={handleAmountChange} name="amount" id="amount" className='w-full h-10 border-2 border-gray-300 rounded-md px-2' />

            <div className='flex justify-between mt-4'>
              <div className='space-y-4'>
                <h1 className='text-gray-400'>Discount :</h1>
                <p className='font-medium'>{offerdetail.offer_detail}</p>
              </div>
              <div className='text-right space-y-4'>
                <h1 className='text-gray-400'>Total Savings :</h1>
                <p className='font-medium text-green-500'>₹ {savings}    </p>
              </div>
            </div>

            <button type='submit' className='w-full rounded-md py-2 bg-black hover:bg-slate-900 text-white mt-8'>Generate</button>
            <button type='button' onClick={() => { setPop(false); setAmount(0); }} className='w-full rounded-md py-2 bg-gray-200 hover:bg-gray-300 border border-gray-400 mt-2'>Cancel</button>

          </form>
        </section>
      }
    </div>
  )
}

export default Product_Detail