import React from 'react'
import img from '../../assets/img1.png';

import { LuTrendingUpDown } from 'react-icons/lu'
const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-xl'>Expense Tracker</h2>
                {children}
            </div>
            <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
                <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'></div>

                <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-[10%]'></div>
                <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5'></div>

                <div className="grid grid-cols-1 z-20" >
                    <StatInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Expenses and Income"
                        value="400000"
                        color="bg-primary"
                    />

                </div>
                <img src={img} className='w-64 lg:w-[90%] rounded-[32px] absolute bottom-10 shadow-lg shadow-blue-400/15' />
            </div>
        </div>
    )
}

export default AuthLayout;

const StatInfoCard = ({ icon, label, value, color }) => {
    return <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400 border border-gray-200/50 z-10'>
        <div className={`w-[50px] h-[50px] items-center justify-center text-[39px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-xs text-gray-500 mb1'>{label}</h6>
            <span className='text-[20px]'>₹ {value}</span>
        </div>
    </div>
}


