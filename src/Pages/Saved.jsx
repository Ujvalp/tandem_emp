import React from 'react'
import Cat_NavSaved from '../components/Cat_NavSaved'
import Saved_Cart_Item from '../components/Saved_Cart_Item'
import { useEffect } from 'react'
import { useState } from 'react'
import { SupabaseEmp } from '../supabase/supabase'
import { useAuth } from '../context/AuthProvider'
import { Link, NavLink } from 'react-router-dom'
import Loading from "../components/Loading"

const Saved = () => {
    const [categoryName, setCategoryName] = useState([])
    const [collection, setCollection] = useState([])
    const [allNav, setAllNav] = useState(false)
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false)
    const [renderCateName,setRenderCateName]=useState(true)
    const [render, setRender] = useState(true)
    const [fetching, setFetching] = useState(true)
    const { user } = useAuth();
    const [active, setActive] = useState(null)
    const [saveddata,setSavedData] = useState(true)
    const [nosaveddata,setNoSavedData] = useState(true)

    useEffect(() => {
        fetchSavedCollection();
        async function fetchSavedCollection() {
            //setLoading(true)



            const { data, error } = await SupabaseEmp
                .from('emp_collection')
                .select()
                .eq("emp_id", user.id)
            if (data) {
                //console.log(data);
                setCategoryName(data)
                // setLoading(false)
            } else {
                console.log(error);

            }
        }





    }, [renderCateName])

    useEffect(() => {

        const selectedCategory = localStorage.getItem("selectedCategoryId");


        if (selectedCategory) {
            fetchSavedCollection();
           // console.log(selectedCategory);
            // console.log(user.id);

            async function fetchSavedCollection() {
                setLoading(true)
                setFetching(true)

                const { data, error } = await SupabaseEmp
                    .from('save_collection')
                    .select()
                    .eq("emp_id", user.id)
                    .eq("cate_uid", selectedCategory)
                if (data) {
                    setTimeout(() => {

                        setCollection(data)
                        // setNoSavedData(!nosaveddata)
                        // console.log(data);
                        setFetching(false)
                        setLoading(false)
                    }, 700)
                } else {
                    console.log(error);
                }

            }
        } else {

            fetchSavedCollection();

            async function fetchSavedCollection() {
                setLoading(true)
                setFetching(true)

                const { data, error } = await SupabaseEmp
                    .from('save_collection')
                    .select()
                    .eq("emp_id", user.id)
                if (data) {
                    setTimeout(() => {
                        setCollection(data)
                        setNoSavedData(!nosaveddata)
                        // console.log(data);
                        setFetching(false)
                        setLoading(false)

                    }, 700)
                } else {
                    console.log(error);
                }

            }

        }
    }, [render])

    function saveCatToLocalStorage(cateId) {
        localStorage.setItem("selectedCategoryId", cateId)
        setRender(!render)

    }
    return (
        <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center bg-gray-200'>
            {loading &&
                <Loading />
            }
            <div className='max-w-[1180px] w-full min-h-full px-8 py-5 flex flex-col gap-5'>
                <h1 className='text-xl font-medium ml-8'>Saved offers</h1>

                <section className='bg-white w-full h-full rounded-lg py-8 md:pb-56 px-10 space-y-12'>
                    <ul className='catNav no-scrollbar flex flex-nowrap items-center overflow-x-auto snap-x snap-mandatory px-5 h-14 w-full gap-5'>

                        
                            {collection.length && saveddata ?
                            <li className='flex-none py-2 px-2 snap-always snap-center overflow-hidden'>
                                <Link onClick={() => { setToggle(true); setActive(false); localStorage.removeItem("selectedCategoryId"); setRender(!render) }} className={`block ${toggle && "text-white font-semibold bg-[#6f5ff1]"} catNav py-2 px-10 text-center text-sm shadow-md rounded-full border-[1.5px] border-gray-300`}>All</Link>
                            </li> 
                            :
                            !collection.length && !nosaveddata ?
                            "No saved offers"
                            :""
                            }
                        

                        {categoryName.map((items, index) => (

                            <li onClick={() => { setToggle(false) }} key={index} className='flex-none py-2 snap-always snap-center overflow-hidden'>
                                <Link onClick={() => { saveCatToLocalStorage(items.cate_uid); setActive(items) }} className={`${active == items && "savedNav"} block catNav py-2 px-10 text-center text-sm shadow-md rounded-full border-[1.5px] border-gray-300`}>
                                    {items.cate_name}
                                </Link>

                                {/* <Cat_NavSaved catData={items} name={items.cate_name}
                                    cate_uid={items.cate_uid}
                                    saveCatToLocalStorage={saveCatToLocalStorage} saved /> */}
                            </li>
                        ))}


                    </ul>

                    {!fetching && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {collection.map((item, index) => (
                            <div key={index}>
                                <Saved_Cart_Item
                                    collectionData={item}
                                    render={render}
                                    setRender={setRender}
                                    renderCateName={renderCateName}
                                    setRenderCateName={setRenderCateName}
                                />
                            </div>

                        ))}

                    </div>}
                </section>
            </div>
        </div>
    )
}

export default Saved