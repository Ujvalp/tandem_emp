import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillEdit } from "react-icons/ai";
import { useAuth } from '../context/AuthProvider';
import { func } from 'prop-types';
import { SupabaseEmp } from '../supabase/supabase';

const Profile = () => {
    const [toggleP, setToggleP] = useState(false);
    const [toggleB, setToggleB] = useState(false);
    const [profiileData, setProfiileData] = useState("")
    const [updatedData, setUpdatedData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        dob: "",
        city: "",
        state: "",
        country: "",
        zip_code:"",
       



    })

    const [updateprofessional, setUpdateProfessional] = useState({
        biz_name: "",
        job_title:"",
        work_email:"",
        salary:"",

    })





    const { user,cartNumber } = useAuth();


      useEffect(() => {

        fetchProfileDetails();
        fetchProfessionalDetails();
        // cartNumber()
        async function fetchProfileDetails() {


          const { data, error } = await SupabaseEmp
            .from('emp_user_db')
            .select()
            .eq("emp_id", user.id)
            .single()
          if (data) {
            // console.log(data);
            setUpdatedData(data)
          }


        }




        async function fetchProfessionalDetails() {
          const { data, error } = await SupabaseEmp
          .from('emp_user_db')
          .select()
          .eq("emp_id", user.id)
          .single()

          if(data) {
            setUpdateProfessional(data)
          }
        }


      }, [])


    async function handleSubmit(e) {
        e.preventDefault();


        const { data, error } = await SupabaseEmp
            .from('emp_user_db')
            .update({
                name: updatedData.name,
                phone: updatedData.phone,
                address: updatedData.address,
                email: updatedData.email,
                gender: updatedData.gender,
                dob: updatedData.dob,
                city: updatedData.city,
                state: updatedData.state,
                country: updatedData.country,
                zip_code: updatedData.zip_code,
                



            })
            .eq('emp_id', user.id)
        if (!error) {
            setToggleP(false)
        }


    }


    function handleChange(e) {

        const { name, value } = e.target;

        setUpdatedData((prev) => {
            return { ...prev, [name]: value }
        })

    }


    function handleChangeProfessional(e) {
        const { name, value } = e.target;

        setUpdateProfessional((prev) => {
            return { ...prev, [name]: value }
        })

    }





    async function handleSubmitProfessional(e) {
        e.preventDefault()

        const { data, error } = await SupabaseEmp
            .from("emp_user_db")
            .update({

                work_email: updateprofessional.work_email,
                job_title:updateprofessional.job_title,
                biz_name:updateprofessional.biz_name,
                salary:updateprofessional.salary,
                

            })
            .eq('emp_id', user.id)

        if (!error) {
            setToggleB(false)
        }
    }













    return (
        <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center md:pb-56 bg-gray-200'>
            <div className='max-w-[1180px] w-full min-h-full px-8 py-5 flex flex-col gap-5'>
                <h1 className='text-xl font-medium ml-8'>Profile</h1>



                {/* Personal detail popup */}
                {
                    toggleP &&

                    <section className='fixed z-50 top-0 left-0 w-full min-h-screen bg-gray-300/60 flex justify-center items-center'>
                        <div className='h-fit w-[600px] bg-white border-[1.9px] border-gray-300 rounded-md px-16 py-10'>
                            <form method="post" onSubmit={handleSubmit} className='w-full space-y-10'>
                                <div className='flex justify-between'>
                                    <h1 className='font-semibold'>Personal Details</h1>
                                </div>


                                <div className='grid grid-cols-3 gap-2'>

                                    <label className='text-[15px]' htmlFor="text">Fulll Name :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        value={updatedData.name}
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Phone Number :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="tel"
                                        name="phone"
                                        onChange={handleChange}
                                        value={updatedData.phone}
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Email Id:</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={updatedData.email}
                                        readOnly
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Gender :</label>
                                    <select name="gender" className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`} >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>

                                    <label className='text-[15px]' htmlFor="text">Date of Birth :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="date"
                                        name="dob"
                                        onChange={handleChange}
                                        value={updatedData.dob}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Address :</label>
                                    <textarea
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md p-2`}
                                        required
                                        name="address"
                                        onChange={handleChange}
                                        value={updatedData.address}
                                        cols={30}
                                        rows={3}
                                    />

                                    <label className='text-[15px]' htmlFor="text">City :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="city"
                                        onChange={handleChange}
                                        value={updatedData.city}
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">State :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="state"
                                        onChange={handleChange}
                                        value={updatedData.state}
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Country :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="country"
                                        onChange={handleChange}
                                        value={updatedData.country}
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Zip Code :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="number"
                                        name="zip_code"
                                        onChange={handleChange}
                                        value={updatedData.zip_code}
                                        required

                                    />

                                </div>


                                <div className='flex justify-center items-center gap-10'>
                                    <button type="submit" className='w-[160px] h-8 bg-[#028820] hover:bg-[#2fa448] border-[1.9px] border-[#028820] rounded-md text-white'>Update</button>
                                    <button onClick={() => setToggleP(false)} className='w-[160px] h-8 border-[1.9px] border-[#737373] rounded-md hover:bg-gray-50'>Cancel</button>
                                </div>


                            </form>
                        </div>
                    </section>
                }





                {/* Professional Detail Popup */}
                {
                    toggleB &&
                    <section className='absolute top-0 left-0 w-full h-full bg-gray-300/60 flex justify-center items-center'>
                        <div className='h-fit bg-white border-[1.9px] border-gray-300 rounded-md p-16'>
                            <form method="post" onSubmit={handleSubmitProfessional} className='w-full space-y-10'>
                                <div className='flex justify-between'>
                                    <h1 className='font-semibold'>Professional Details</h1>
                                </div>


                                <div className='grid grid-cols-3 gap-2'>

                                    <label className='text-[15px]' htmlFor="text">Organization name :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="biz_name"
                                        value={updateprofessional.biz_name}
                                        onChange={handleChangeProfessional}
                                        readOnly
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Job Title :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="job_title"
                                        value={updateprofessional.job_title}
                                        onChange={handleChangeProfessional}
                                        readOnly
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Salary :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-2 border-2 border-gray-200 accNumber text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="number"
                                        name="salary"
                                        onChange={handleChangeProfessional}
                                        value={updateprofessional.salary}
                                        readOnly
                                        required
                                    />

                                    <label className='text-[15px]' htmlFor="text">Work Email :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="email"
                                        name="work_email"
                                        onChange={handleChangeProfessional}
                                        required
                                        value={updateprofessional.work_email}
                                    />

                                </div>

                                <div className='flex justify-center items-center gap-10'>
                                    <button type="submit" className='w-[160px] h-8 bg-[#028820] hover:bg-[#2fa448] border-[1.9px] border-[#028820] rounded-md text-white'>Submit</button>
                                    <button onClick={() => setToggleB(false)} className='w-[160px] h-8 border-[1.9px] border-[#737373] rounded-md hover:bg-gray-50'>Cancel</button>
                                </div>

                            </form>
                        </div>
                    </section>
                }



                <div className='w-[calc(100%-3rem)] flex flex-col gap-5 '>

                    <section className='flex flex-col md:flex-row justify-between gap-7 text-[#28313B]'>

                        {/* Personal Details */}

                        <div className='left w-full h-fit bg-white border-[1.9px] border-gray-300 rounded-md py-10 px-10 md:px-16'>
                            <form method="post" className='w-full h-full space-y-10'>
                                <div className='flex justify-between'>
                                    <h1 className='font-semibold'>Personal Details</h1>
                                    <div onClick={() => setToggleP(true)} className='text-[#737373] text-base cursor-pointer hover:bg-gray-50 flex justify-center items-center gap-1 border-[1.9px] border-gray-300 rounded-md w-[80px]'>
                                        <AiFillEdit />
                                        <p>Edit</p>
                                    </div>
                                </div>


                                <div className='grid grid-cols-3 items-center h-fit gap-2'>

                                    <label className='text-[15px]' htmlFor="text">Full Name :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="name"
                                        placeholder={updatedData.name}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Phone Number :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="tel"
                                        name="phone"
                                        placeholder={updatedData.phone}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Email Id:</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="email"
                                        name="email"
                                        placeholder={updatedData.email}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Gender :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="gender"
                                        placeholder={updatedData.gender}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Date of Birth :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="dob"
                                        placeholder = {updatedData.dob}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Address :</label>
                                    <textarea
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md p-2`}
                                        required
                                        name="address"
                                        placeholder={updatedData.address}
                                        cols={30}
                                        rows={3}
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">City :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="city"
                                        placeholder={updatedData.city}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">State :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="state"
                                        placeholder={updatedData.state}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Country :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="country"
                                        placeholder={updatedData.country}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px]' htmlFor="text">Zip Code :</label>
                                    <input
                                        className={`${!toggleP && "outline-none"} col-span-2 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="zip_code"
                                        placeholder={updatedData.zip_code}
                                        readOnly
                                        required

                                    />

                                </div>

                            </form>
                        </div>



                        {/* Bank details */}
                        <div className='left w-[1140px] h-fit bg-white border-[1.9px] border-gray-300 rounded-md py-10 px-10'>
                            <form method="post" className='w-full space-y-10'>
                                <div className='flex justify-between'>
                                    <h1 className='font-semibold'>Professional Details</h1>
                                    {/* <div onClick={() => setToggleB(true)} className='text-[#737373] text-base cursor-pointer hover:bg-gray-50 flex justify-center items-center gap-1 border-[1.9px] border-gray-300 rounded-md w-[80px]'>
                                        <AiFillEdit />
                                        <p>Edit</p>
                                    </div> */}
                                </div>


                                <div className='grid grid-cols-5 items-center gap-2'>

                                    <label className='text-[15px] col-span-2' htmlFor="text">Organization name :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-3 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="bName"
                                        placeholder={updateprofessional.biz_name}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px] col-span-2' htmlFor="text">Job Title :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-3 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="text"
                                        name="accName"
                                        placeholder={updateprofessional.job_title}
                                        required
                                        readOnly
                                    />

                                    <label className='text-[15px] col-span-2' htmlFor="text">Salary :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-3 border-2 border-gray-200 accNumber text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="number"
                                        name="accNum"
                                        required
                                        placeholder={updateprofessional.salary}
                                        readOnly
                                    />

                                    <label className='text-[15px] col-span-2' htmlFor="text">Work Email :</label>
                                    <input
                                        className={`${!toggleB && "outline-none"} col-span-3 border-2 border-gray-200 text-sm rounded-md px-4 w-full h-8 placeholder:font-Poppins  placeholder:tracking-wide`}
                                        type="email"
                                        name="ifsc"
                                        required
                                        placeholder={updateprofessional.work_email}
                                        readOnly
                                    />

                                </div>


                            </form>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}

export default Profile