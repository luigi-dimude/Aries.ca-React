import React, { useEffect } from 'react'
import Navbar from '../layout/Navbar'
import Search from './Search'
import DisplayJobs from './DisplayJobs'
import { useState } from 'react'
import { JobContext } from '../contexts/jobsContext'
import Pagination from '../Pagination'
import Axios from 'axios'


const Jobs = () => {

  
  // State
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [numOfJobs, setNumOfJobs] = useState(0)


  // Onload
  useEffect( async() => {

    try {
      if (!request) {
        console.log('reqChanging', request)
        const res = await Axios.get(`https://jobs-api-arie.herokuapp.com/api/v1/jobs?page=${currentPage}`);
        setRequest(`https://jobs-api-arie.herokuapp.com/api/v1/jobs?page=${currentPage}`);
        setNumOfJobs(res.data.numOfJobs)
      }
      
      

    }
    catch(err) {
      console.log(err)
    }
  }, [currentPage])




  console.log('currPAge',currentPage)
  return (
    <>
        <Navbar/>
        <JobContext.Provider value={{ request, setRequest, loading, setLoading, numOfJobs, setNumOfJobs, currentPage, setCurrentPage}}>
          <Search/>
          <DisplayJobs/>
          <Pagination/>
        </JobContext.Provider>

    </>
  )
}

export default Jobs