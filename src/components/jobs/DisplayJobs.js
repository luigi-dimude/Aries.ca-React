import React, { useState } from 'react'

// Library that serves to create HTTP requests that are present externally
import Axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useContext } from 'react';
import { JobContext } from '../contexts/jobsContext';



const DisplayJobs = () => {
  
  const { loading, setLoading, currentPage,  request } = useContext(JobContext)

  const [fetchedJobs, setFetchedJobs] = useState([])



  const [singleJob, setSingleJob] = useState({
    _id: '',
    title:'',
    companyName: '',
    hourlySalary: 0,
    duration: '',
    contactPhoneNumber: '',
    contactEmail: '',
    description: ''
  })

  const [displaySingleJob, setDisplaySingleJob] = useState(false)

  // Jobs shown per page
  const LIMIT = 10

  // On Page load
  useEffect(() => {
    // Gets the user details from the server
    fetchJobs();
    
  }, [request, currentPage]);

  
  const fetchJobs = async () => {
    try {
      
      setLoading(true)
      
      const response = await Axios.get(`${request}&page=${currentPage}&limit=${LIMIT}`);
      const jobs = response.data.jobs;
      setFetchedJobs(jobs)
      setDisplaySingleJob(false)
      setLoading(false)

  
    }
    catch(err) {
      console.log(err)
    }
  
  } 
  
  

  
  

  const fetchDetails = async (jobId) => {
    let single_job = fetchedJobs.filter( job => {
      return jobId == job._id;
    })
    single_job = single_job[0] 
    setSingleJob({...singleJob, ...single_job})
    setDisplaySingleJob(true)
  }


  if(loading) {
    return(
      <div className='container mt align-center'>
        <CircularProgress />
      </div>

    )
  }

  else if (fetchedJobs.length < 1) {
    return (
      <div className="container mt align-center mb-3">
        <div className="jobs__card">
          <em>Sorry, no jobs found..</em>
        </div>
      </div>
    )
  }

  else {
    return (
      <>
      <div id='display__jobs' className='container mt'>
        <div className="jobs__container">
          <div className="jobs__list">
            {fetchedJobs.map( job => {
              return (
                <div className="jobs__card mb-2" 
                key={job._id}
                onClick={() => fetchDetails(job._id)}>
                  <h2 className='jobs__title'>{job.title}</h2>
                  <h4 className='jobs__salary'>${job.hourlySalary} <span className='jobs__perHour'>/hr</span></h4>
                  <h4 className='jobs__company'>{job.companyName !== 'n/a' && job.companyName}</h4>
                  <h4 className='jobs__details jobs__duration'>{job.duration !== 'n/a' && job.duration}</h4>
                  <h4 className='jobs__details'>{job.address.city}</h4>
              </div>
              )
            })}
          </div>
          <div className="jobs__detail">
            {
              displaySingleJob && <div className="jobs__card-detail">
              <h2 className='jobs__title jobs__title-detail'>{singleJob.title}</h2>
                  <h4 className='jobs__salary jobs__detail-salary'>${singleJob.hourlySalary} <span className='jobs__perHour'>/hr</span></h4>
                  <div className="jobs__detail-contact">
                    <p>{singleJob.contactPhoneNumber !== 'n/a' && singleJob.contactPhoneNumber}</p>
                    <p>{singleJob.contactEmail !== 'n/a' && singleJob.contactEmail}</p>
                  </div>
                  <h4 className='jobs__detail-companyName'>{singleJob.companyName !== 'n/a' && singleJob.companyName}</h4>
                  <h4 className='jobs__detail-duration'>Duration: {singleJob.duration !== 'n/a' && singleJob.duration}</h4>
                  <h4 className='jobs__detail-startDate'>Starts: {singleJob.startDate.substring(0,10)}</h4>
                  <div className="jobs__detail-address">
                    <p><strong>Province:</strong> {singleJob.address.province}</p>
                    <p><strong>Region:</strong> {singleJob.address.region}</p>
                    <p><strong>City:</strong> {singleJob.address.city}</p>
                    <p><strong>Street:</strong> {singleJob.streetLocation}</p>
                  </div>
                  <p className='jobs__detail-description'>{singleJob.description}</p>
            </div>
            }
          </div>
        </div>
      </div>

      <div id="display__jobs-mobile" className="container mt">
        {fetchedJobs.map(job => {
          return(
            <div className="jobs__card mb-2">
              <h2 className='jobs__title'>{job.title}</h2>
              <h4 className='jobs__salary'>${job.hourlySalary} <span className='jobs__perHour'>/hr</span></h4>
              <h4 className='jobs__company'>{job.companyName !== 'n/a' && job.companyName}</h4>
              <h4 className='jobs__details'>City: {job.address.city}</h4>
              <h4 className='jobs__details'>Street: {job.streetLocation}</h4>
              <h4 className='jobs__details'>Start Date: {job.startDate.substring(0,10)}</h4>
              <h4 className='jobs__details jobs__duration'>{job.duration !== 'n/a' && job.duration}</h4>
              <h4 className='jobs__details mt-1'><strong>{job.contactPhoneNumber}</strong></h4>
              <h4 className='jobs__details mb-1'><strong>{job.contactEmail}</strong></h4>
              <p>{job.description}</p>
            </div>
          )
        })}
      </div>
      </>
    )
  }
}

export default DisplayJobs