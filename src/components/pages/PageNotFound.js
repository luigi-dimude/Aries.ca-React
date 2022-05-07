import React from 'react'
import Navbar from '../layout/Navbar';

const PageNotFound = () => {
  return (
    <>
      <Navbar/>
      <div className="container align-center mb-2">
      <div className='userJobs__card not-found mt'><em>Page not found</em></div>
    </div>
    </>
  )
}

export default PageNotFound;