import { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineCloseCircle } from "react-icons/ai";
import { Alert } from 'antd';
import {useLocation} from 'react-router-dom';

const SignUp_Info = ({ formData, setFormData, onChange,SetMsg,setError }) => {

    const [eye, setEye] = useState(false);
    const [passError, setPassError] = useState("")
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstRender, setFirstRender] = useState(false)
    const location=useLocation();
    // console.log(location)

    function passwordd(e) {
        const { name, value } = e.target;
        setFormData((prev) => {
            return { ...prev, [name]: value }
        })

    }
    useEffect(() => {
        if (firstRender) {
            if (confirmPassword) {
                if (password != confirmPassword) {
                    setPassError("Password and Confirm Password Didn't Match")
                } else {
                    setPassError("")
                }

            }


        } else {
            setFirstRender(true)
        }

    }, [confirmPassword, password])

    return (
        <div className='flex flex-col space-y-3'>
            <input
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-9 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700'
                type="text"
                // required
                placeholder={location.state.savedemail}
                name="email"
                value={location.state.savedemail}
                onChange={(e) =>{
                    // setFormData({ ...formData, email: e.target.value })
                    setError("");
                    SetMsg("");

                } }
            />
            <div className="flex justify-between items-center shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-9 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700">
                <input
                    className='bg-transparent outline-none w-full pr-2'
                    type={eye ? 'text' : 'password'}
                    required
                    placeholder="Password ..."
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                        passwordd(e);
                        setPassword(e.target.value);
                        setFormData({ ...formData, password: e.target.value })
                    }}
                />
                {
                    eye ? <AiOutlineEye onClick={() => { setEye((!eye)) }} className="text-xl text-gray-400" /> : <AiOutlineEyeInvisible onClick={() => { setEye((!eye)) }} className="text-xl text-gray-400" />
                }
            </div>

            <div className="flex justify-between items-center shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px]  border border-1 border-gray-300 text-sm rounded-md px-4 w-60 tab:w-72 lap:w-80 m-auto h-9 hover:bg-gray-100 focus:bg-gray-100 focus:outline-blue-700">
                <input
                    className='bg-transparent outline-none w-full pr-2'
                    type={eye ? 'text' : 'password'}
                    required
                    placeholder="Confirm Password ..."
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                        passwordd(e);
                        setConfirmPassword(e.target.value);

                    }}


                />

                {
                    eye ? <AiOutlineEye onClick={() => { setEye((!eye)) }} className="text-xl text-gray-400" /> : <AiOutlineEyeInvisible onClick={() => { setEye((!eye)) }} className="text-xl text-gray-400" />
                }


            </div>
            {
                passError &&
                <Alert
                    className='w-60 tab:w-72 lap:w-80 mb-7 h-fit'
                    message={passError}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setPassError("")}
                />
                // <div className="flex justify-between items-center px-3 py-1 border border-red-700 bg-red-200">
                //     <p className="text-xs text-center">{passError}</p>
                //     <AiOutlineCloseCircle onClick={()=>setPassError("")} className="text-red-600" />
                // </div>
            }

        </div>
    )
}

export default SignUp_Info