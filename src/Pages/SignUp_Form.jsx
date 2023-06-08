import React, { useState } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom';
import Signup_Page2 from '../components/Signup_Page2';
import Signup_Page1 from '../components/Signup_Page1';
import SignUp_Info from '../components/SignUp_Info';
import { Alert } from 'antd';
import { SupabaseEmp } from '../supabase/supabase';
import { useAuth } from '../context/AuthProvider';


const SignUp_Form = () => {

    const location=useLocation();
    // console.log(location.state.emaildata[0]);
    const {signOut} = useAuth();
    // console.log(location)
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("")
    const [formData, setFormData] = useState({
        name:"",
        phone:"",
        password:"",
        confirmPassword:"",
        gender:"",
        dob:"",
        address:"",
        zipcode:"",
        city:"",
        state:"",
        country:""
    })




    const [loading, setLoading] = useState(false);

    // const register = (email, password) =>
    //     supabase.auth.signUp({ email, password });


    function handleSubmit(e) {
        e.preventDefault();
        if (page < FormTitles.length - 1) {
            setPage((currPage) => currPage + 1);

        }



    }

    const signUp = async () => {




        //get user from data
        const { data: { user }, error } = await SupabaseEmp.auth.signUp(
            {
                email: location.state.savedemail,
                password: formData.password,
                options: {
                    data: {

                        name: formData.name,
                        phone: formData.phone,
                        gender: formData.gender,
                        dob: formData.dob,
                        address: formData.address,
                        zipcode: formData.zipcode,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        biz_id: location.state.emaildata[0].biz_id,
                        salary: location.state.emaildata[0].salary,
                        job_title: location.state.emaildata[0].job_title,
                        biz_name: location.state.emaildata[0].biz_name,
                        plan: location.state.emaildata[0].plan



                    }
                }
            }
        );
        if (user) {
            // console.log(user);
            // add message for success
            const {data,error} = await SupabaseEmp.rpc('fts_emp_user_db_call')
            if(data){
                // console.log(data);
            }
            else{
                // console.log(error)
            }

            setMsg("Registraion Successful! Try Login");
            setTimeout(() => {
                setLoading(false)
                navigate("/login")
            }, 500);
            // navigate("/login")
            signOut();
            
            // location.state.savedemail("")
            // console.log(location.state.savedemail)
            // console.log(user);


        } if (error) {
            //add error
            console.log(error);

            setError("User already registered. Try Login");

        }



    };


    const FormTitles = ["Personal Details", "Address", "Sign Up"];

    const PageDisplay = () => {
        if (page === 2) {
            return <SignUp_Info SetMsg={setMsg} setError={setError} formData={formData} setFormData={setFormData} />
        } else if (page === 0) {
            return <Signup_Page1 formData={formData} setFormData={setFormData} />
        } else if (page === 1) {
            return <Signup_Page2 formData={formData} setFormData={setFormData} />
        }
    }

    return (
        <div className='form w-full min-h-screen h-full bg-gray-200 flex flex-col items-center justify-center font-Poppins'>
            <Link to={"/"}>
                <img className='absolute top-3 left-3' src="" alt="logo" />
            </Link>
            <div className='progressbar w-[308px] tab:w-[353px] lap:w-[388px] mb-10 border border-blue-500 rounded'>
                <div className={`bg-blue-600 h-3 flex items-center justify-center text-white text-[10px] duration-1000 ${page === 0 ? "w-1/3" : page === 1 ? "w-2/3" : "w-full"}`}>
                    Step {page === 0 ? "1 of 3" : page === 1 ? "2 of 3" : "3 of 3"}
                </div>
            </div>
            <form onSubmit={handleSubmit} className='form-container flex flex-col justify-between w-fit min-h-[400px] bg-white py-4 px-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                <div className='header text-2xl text-center font-bold mb-8'>
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className='body mb-5'>{PageDisplay()}</div>

                {/* Error message */}
                {
                    error && <Alert
                        className='w-60 tab:w-72 lap:w-80 mb-7 h-fit'
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError("")}
                    />

                }

                {
                    msg && <Alert
                        className='w-60 tab:w-72 lap:w-80 mb-7 h-fit'
                        message={msg}
                        type="success"
                        showIcon
                        closable
                        onClose={() => setMsg("")}
                    />
                }

                <div className='footer flex justify-center items-center'>
                    <button
                        className={`${page == 0 ? "hidden" : ""} py-0.5 border border-1 border-blue-800 w-24 rounded-lg bg-blue-700 hover:bg-blue-600 text-white mr-5`}
                        // disabled={page == 0}
                        type="button"
                        onClick={() => {
                            setPage((currPage) => currPage - 1)
                        }}
                    >Prev</button>
                    <button
                        className={`py-0.5 border border-1 border-blue-800 w-24 rounded-lg bg-blue-700 hover:bg-blue-600 text-white `}
                        type="submit"
                        onClick={() => {
                            if (page === FormTitles.length - 1) {
                                signUp();


                            }


                        }}
                    >{page == FormTitles.length - 1 ? "Sign Up" : "Next"}</button>

                </div>
            </form>
            
        </div>
    )
}

export default SignUp_Form