import React, { useContext, useState } from 'react'
import AuthLayout from '../../Components/layout/AuthLayout'
import Input from '../../Components/Inputs/Input'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ValidateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import { UserContext } from '../../context/UserContext';
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);
  const handleLogin = async (e) => {

    e.preventDefault();

    if (!ValidateEmail(email)) {
      seterror("Please enter a valid email")
      return;
    }
    if (!password) {
      seterror("Please enter a valid password")
      return;
    }

    seterror("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });

      const {token,user} = response.data;

      if(token){
        localStorage.setItem("token",token); 
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong. Please try again !");
      }
    }
  }
  return (

    <AuthLayout>
      <div className="lg:w-[75%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-xl font font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your Details to Login</p>

        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder='xyz@example.com'
            value={email}
            label="Email address"
            onChange={({ target }) => setemail(target.value)} />
          <Input
            type="password"
            placeholder='Min 8 Characters'
            value={password}
            label="Password"
            onChange={({ target }) => setpassword(target.value)} />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            LOGIN
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have any account ? {""}
            <Link className='text-medium text-primary underline' to='/signup'>
              Signup</Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login