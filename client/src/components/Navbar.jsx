import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    
    const {navigate, token} = useAppContext()

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
      <button onClick={()=>navigate('/admin')}  className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
        {token ? 'Dashboard' : 'Login'} 
    
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar





/*
CSS:


.your-class {
  padding-top: 1.25rem;     /* py-5 
  padding-bottom: 1.25rem;
  margin-left: 2rem;        /* mx-8 
  margin-right: 2rem;
}

@media (min-width: 640px) {
  .your-class {
    margin-left: 5rem;      /* sm:mx-20 
    margin-right: 5rem;
  }
}

@media (min-width: 1280px) {
  .your-class {
    margin-left: 8rem;      /* xl:mx-32 
    margin-right: 8rem;
  }
}



sm: Apply this style on screen widths 640px and above

📘 So sm:mx-20 means:
"From screen width 640px and up, set margin-left and margin-right to 5rem (80px)."




*/