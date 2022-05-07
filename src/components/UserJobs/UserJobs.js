import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../layout/Navbar';



const UserJobs = () => {

  let navigate = useNavigate();

  const [userJobs, setUserJobs] = useState([])
  const [loading, setLoading] = useState(true)


   // On Page load
   useEffect( async() => {

    auth();
    getJobs();
    
  }, []);

  const auth = () => {
    const username = localStorage.getItem('jobs-aries-username');
    const token = localStorage.getItem("jobs-aries-token")

    if (!username || !token) {
      navigate('/')

    }
  }


  const getJobs = async() => {
    try {
      const res = await Axios.get(`https://jobs-api-arie.herokuapp.com/api/v1/user-jobs`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jobs-aries-token"),
        }
      });

      console.log(res.data.jobs)
      setUserJobs(res.data.jobs);
      setLoading(false)

    }
    catch(err) {
      console.log(err)
      // navigate("/");

    }
  }


  if (loading) {
    return(
      <>
        <Navbar/>
        <div className="mt container">
          <Link to={`/userJobs/add`}  className="create__job">Create a job</Link>
        </div>
        <div className='container mt align-center'>
          <CircularProgress />
        </div>
      </>
    )
  }

else if (userJobs.length < 1) {
  
  return (
    <>    
      <Navbar/>
      <div className="mt container">
          <Link to={`/userJobs/add`} className="create__job">Create a job</Link>
        </div>
      <div className='container mt'>
        <div className="userJobs__card no-jobs">
          <em>You currently have no jobs...</em>
        </div>
        <div className='mb'></div>
      </div>
    </>
  )
}

else {
  return (
    <>    
      <Navbar/>
      <div className="mt container">
          <Link to={`/userJobs/add`} className="create__job">Create a job</Link>
        </div>
      <div className='container mt mb'>
        <ul className='userJobs__ul'>
        {
          userJobs.map(job => {
            return(
              <li className='userJobs__li'  key={job._id}>
                <div className="userJobs__card">
                  <h1>{`${job.title.charAt(0).toUpperCase()}${job.title.substring(1,10)}`}</h1>
                  <h1 className='userJobs__hourlySalry'>${job.hourlySalary} <span className='userJobs__perHour'>/hr</span></h1>
                  <div className="userJobs__jobDetails">
                  <p><span className='userJobs__head'>Start Date :</span> {job.startDate.substring(0,10)}</p>
                  <p><span className='userJobs__head'>Company Name :</span> {job.companyName}</p>
                  <p><span className='userJobs__head'>Phone Number :</span> {job.contactPhoneNumber}</p>
                  <p><span className='userJobs__head'>Email Address :</span> {job.contactEmail}</p>
                  <p><span className='userJobs__head'>Duration :</span> {job.duration}</p>
                  <p><span className='userJobs__head'>Start Date :</span> {job.startDate.substring(0,10)}</p>
                  <p><span className='userJobs__head'>Description :</span> {job.description}</p>
                  <p><span className='userJobs__head'>Province :</span> {job.address.province}</p>
                  <p><span className='userJobs__head'>Region :</span> {job.address.region}</p>
                  <p><span className='userJobs__head'>City :</span> {job.address.city}</p>
                  <p><span className='userJobs__head'>Street Location :</span> {job.streetLocation}</p>
                  </div>
                  <div className='userJobs__editDelete-container'>
                    <Link to={`/userJobs/edit/${job._id}`} className='userJobs__btn'>Edit Job</Link>
                    <Link to={`/userJobs/delete/${job._id}`} className='userJobs__btn'>Delete Job</Link>
                  </div>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    </>
  )
}

}

export default UserJobs