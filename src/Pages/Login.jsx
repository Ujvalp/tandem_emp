import React, { useState } from 'react'
import icon from '../assets/images/tdm_icon.svg'
import logo from '../assets/images/tandem_logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { useAuth } from '../context/AuthProvider';

const Login = () => {


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { login, user } = useAuth();

    function handleChange() {
        setError("")

    }


    const handleSubmit = async (e) => {

        try {
            setError("");
            setLoading(true);
            const {
                data: { user, session },
                error
            } = await login(e.email, e.password);
            // console.log(user);
            if (error) setError(error.message);
            // console.log(error);
            if (user && session) navigate("/");
        } catch (error) {
            setError("Email or Password Incorrect");
        }
        setLoading(false);


    }

    return (
        <div className='min-w-screen min-h-screen bg-white flex justify-center items-center'>
            <div>
                <Link to={"/"}>
                    <img className='absolute top-3 left-3' src={logo} alt="tandem_img" />
                </Link>
                <div className='flex flex-col justify-center items-center space-y-6'>
                    <img src={icon} alt="Tandem Logo" width={70} height={70} />

                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <h1 className='text-3xl font-medium'>Welcome</h1>
                        <p className='font-light'>Get the most out of your benefits</p>
                    </div>

                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email or Number!',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={handleChange}
                                    className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px] text-sm rounded-md px-3 w-60 md:w-72 lg:w-80 m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                    prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter your email or phone no." />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    onChange={handleChange}
                                    className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px] text-sm rounded-md px-3 w-60 md:w-72 lg:w-80 m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item className=''>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Link className="login-form-forgot md:ml-12 lg:ml-[80px]" to="/forgotpassword">
                                    Forgot password ?
                                </Link>
                            </Form.Item>

                            {/* Error message */}
                            {
                                error && <Alert
                                    className='w-60 md:w-72 lg:w-80 mb-7 h-fit'
                                    message={error}
                                    type="error"
                                    showIcon
                                    closable
                                    onClose={() => setError("")}
                                />

                            }

                            <Form.Item>
                                <Button htmlType="submit" className="login-form-button bg-[#15213A] hover:bg-[#1e3055] shadow-lg hover:shadow-blue-900/70 shadow-blue-900/40 text-gray-300 w-60 md:w-72 lg:w-80 h-9 mx-auto rounded-md font-Poppins tracking-wide border border-1 border-[#15213A]">
                                    Log in
                                </Button>
                            </Form.Item>

                            <div className='text-center text-sm mt-4'>
                                Don't have an account? <Link className='hover:text-blue-500 duration-500' to="/email-validation">Register here!</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login