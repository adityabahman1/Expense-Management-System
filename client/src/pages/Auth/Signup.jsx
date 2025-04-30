import React, { useState, useContext } from 'react';
import AuthLayout from '../../Components/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { ValidateEmail } from '../utils/helper';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../utils/uploadImage';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosInstance';

const Signup = () => {
  const [profilepic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handlesignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';

    if (!name) {
      seterror('Please enter your name');
      return;
    }

    if (!ValidateEmail(email)) {
      seterror('Please enter a valid email');
      return;
    }

    if (!password || password.length < 6) {
      seterror('Enter a valid password (min 6 characters)');
      return;
    }

    seterror('');

    try {
      if (profilepic) {
        const imageUploadRes = await uploadImage(profilepic);
        profileImageUrl = imageUploadRes.path || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: name,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror('Something went wrong. Please try again!');
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>
        <form onSubmit={handlesignup}>
          <ProfilePhotoSelector image={profilepic} setimage={setProfilePic} />
          <div className='grid grid-cols-2 md:columns-2 gap-4'>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              label='Full Name'
              placeholder='John Doe'
              type='text'
            />
            <Input
              type='text'
              placeholder='xyz@example.com'
              value={email}
              label='Email address'
              onChange={({ target }) => setEmail(target.value)}
            />
            <div className='col-span-2'>
              <Input
                type='password'
                placeholder='Min 6 Characters'
                value={password}
                label='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{' '}
            <Link className='text-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
