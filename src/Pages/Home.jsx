import React, { useEffect, useState } from 'react'
import Category_Items from '../components/Category_Items'
import { SupabaseOffers } from '../supabase/supabaseOffer'
import {SupabaseEmp} from '../supabase/supabase'
import { useAuth } from '../context/AuthProvider'

const Home = () => {

  const {user} = useAuth()
  const [catData, setCatData] = useState([])
  const [lifetimesaving,setLifeTimeSaving] = useState("")
  useEffect(() => {
    catList(); //feetching category list
    lifetimesavings()

    async function catList() {

      const { data, error } = await SupabaseOffers
        .from('product_cate')
        .select()
        .order("id",{ascending:true})
      if (data) {
       // console.log(data);
        setCatData(data)

      } else {
        console.log(error);
      }

    }

  }, [])

  /// ----life time saving fetch-----
  async function lifetimesavings(){
    const {data,error} = await SupabaseEmp
    .from("emp_user_db")
    .select()
    .eq("emp_id", user.id)
    .single()
    if(data){
      // console.log(data.total_saving)
      setLifeTimeSaving(data.total_saving)
    }
    else{
      console.log(error)
    }
  }
  


  return (
    <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center bg-white'>
      <div className='max-w-[920px] w-full min-h-full px-8 py-10 md:py-20 md:pb-56 flex flex-col items-center space-y-10 md:space-y-16'>
        <section className='flex flex-row justify-between items-center w-full md:w-[920px] h-full md:h-[140px] py-8 px-5 md:px-10 rounded-3xl shadow-lg border-[1.5px] border-gray-300 gap-6 md:gap-0'>
          <div className='text-left'>
            <h1 className='text-green-600 text-4xl font-medium'>₹ {lifetimesaving}</h1>
            <p className='text-gray-400'>Life time saving</p>
          </div>
          <div className='text-right'>
            <h1 className='text-4xl font-medium'>{lifetimesaving * 0.01}</h1>
            <p className='text-gray-400'>Points</p>
          </div>
        </section>

        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-10'>

          {catData.map((item, index) => (
            <div key={item.id} >
              <Category_Items
              data={item}
               />
            </div>

          ))}
        </section>
      </div>
    </div>
  )
}

export default Home