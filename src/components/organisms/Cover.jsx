import React from 'react';
import { Link } from 'react-router-dom'
import { ShieldIcon } from '../atoms'

export const Cover = () => {
  return (
    <>
      <div className='hidden md:flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-violet-500'>
        <div className='text-center text-white space-y-3 p-8'>
          <Link to="/">
            <ShieldIcon styles='w-28 h-28 mx-auto' />
          </Link>
          <h2 className='text-3xl font-extrabold'>Tecnony</h2>
        </div>
      </div>
    </>
  )
}
