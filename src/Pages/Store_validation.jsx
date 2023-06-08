import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { SupabaseEmp } from '../supabase/supabase';
import {SupabaseOffers} from '../supabase/supabaseOffer'
import { useAuth } from '../context/AuthProvider';

function Store_Validation() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    let edata = [];
    const {setPhone,phone,validatePhone,setValidatePhone} = useAuth()

    async function checkphone(){
        const {data,error} = await SupabaseOffers
        .from('store_location')
        .select()
        .eq("store_phone", phone)
        if(data.length==0){
            setError("you are not register store")
        }
        else if(data){
            navigate("/store-login")
            setValidatePhone(true)
        }
        else{
            console.log(error)
        }
    }

    // async function validEmail(){
    //     //---------------------------- email validation logic here---------------------------
    //     const {data,error} = await SupabaseEmp
    //     .from("emp")
    //     .select()
    //     .eq("email",email)
    //     if(data.length==0) //if not register 
    //     {
    //         // console.log(data)
    //         setError("You are not a registered employee kindly contact your company / HR for employee registration.")
    //     }
    //     else if (data) // if register
    //     {
    //         edata = data
    //         navigate("/signup",{state:{savedemail:email, emaildata:edata}})
    //         setValidateEmail(true)
    //         // console.log(edata);
    //     }
    //     else {
    //         console.log(error)
    //     }
        
    // };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        setError("")
        // setError(validateEmail(event.target.value));
    };

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        if (!error) {
            //alert(`Email submitted: ${email}`);
            // setEmail('');
            setTimeout(() => {
                setLoading(false)
            }, 500);
            // navigate("/signup")
        }
        else {
            setPhone()
            setTimeout(()=>{
                setLoading(false)
            },500)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            {
                loading && <Loading />
            }
            <h1 className='font-bold text-4xl mb-10'>Signup</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md w-[400px] px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-5" htmlFor="phone">
                        Enter your phone to get Started.
                    </label>
                    <input
                        className={`shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''
                            }`}
                        id="phone"
                        type="phone"
                        placeholder="Enter phone"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    {error && (
                        <p className="text-red-500 text-xs italic">{error}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={checkphone}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className='text-base text-center mt-1'>
                Already have an account? <Link className='hover:text-blue-500 duration-500' to="/">Login here!</Link>
            </div>
            {/* <Link 
                to = "/signup"
                state={{savedemail:email,emaildata:edata}}
            /> */}
        </div>
    );
}

export default Store_Validation;
