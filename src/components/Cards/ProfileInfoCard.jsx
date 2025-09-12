import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
    const { user, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

  return (
    user && (
    <div className='flex items-center'>
        <img 
            src={user.profileImageUrl || null} 
            alt=""
            className='w-11 h-11 bg-gray-300 rounded-full mr-3' 
        />
        <div>
            <div className='text-[15px] text-blue-300 font-bold leading-3'>
                {user.name || ""}
            </div>
            <button className='text-red-400 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
    )
  )
}

export default ProfileInfoCard
