import React, {useState, useEffect} from 'react'
// Accesses the parameter passed by the user in the url to identify the user to be deleted
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';



import Navbar from '../layout/Navbar'


const DeleteJob = () => {
  let navigate = useNavigate();


  const [getJobDetails, setGetJobDetails] = useState({

        title:'',
        hourlySalary:0,
        contactPhoneNumber:0,
        companyName: '',
        contactEmail: '',
        duration: '',
        description:'',
        province:'',
        region:'',
        city: '',
        streetLocation:'',
        startDate: new Date()
    
    })

  const [loading, setLoading] = useState(true)

  const [jobDeleted, setJobDeleted] = useState(false)


    
const {title, hourlySalary, companyName, startDate,
    contactPhoneNumber, duration, description, city, 
    contactEmail, streetLocation, province, region} = getJobDetails
    

  // Retrieve the id of the job to be edited from the url 
  const { id } = useParams();

  useEffect( async() => {

    auth();
    getJob();

    
  }, []);

  const auth = () => {
    const username = localStorage.getItem('jobs-aries-username');
    const token = localStorage.getItem("jobs-aries-token")

    if (!username || !token) {
      navigate('/')

    }
  }

  const getJob = async() => {
    try {
      const res = await Axios.get(`https://jobs-api-arie.herokuapp.com/api/v1/user-jobs/${id}`,
      {headers: {
        "Authorization": "Bearer " + localStorage.getItem("jobs-aries-token"),
      }}
      );

      const job = res.data.job
      setGetJobDetails({...getJobDetails, ...job, city:job.address.city, region: job.address.region, province: job.address.province})
      setLoading(false)

    }
    catch(err) {
      console.log(err)
      navigate("/userJobs");

    }
  }

  const deleteJob = async(e) => {
    e.preventDefault();

    try {

      const res = await Axios.delete(`https://jobs-api-arie.herokuapp.com/api/v1/user-jobs/${id}`, 
      {
          headers: {
          "Authorization": "Bearer " + localStorage.getItem("jobs-aries-token"),
        }
      }
      );

      setJobDeleted(true)

    }
    catch(err) {
      console.log(err)
    }
  }

  if (loading) {
    return(
        <>
            <Navbar/> 
            <div className="mt container align-center">
            <CircularProgress/>
            </div>

        </>
    )
  }

 else {
    return (
        <>    
          <Navbar/>
    
          <div className="userJobs__container">
          <div className='container mt mb'>
          
          {  
                
                  <div className="userJobs__card-delete">
                      {jobDeleted ? <div className="align-center">
                      <h1>Successfully Deleted</h1>
                  </div> :
                      <div>
                    <h1>{`${title.charAt(0).toUpperCase()}${title.substring(1,10)}`}</h1>
                    <h1 className='userJobs__hourlySalry'>${getJobDetails.hourlySalary} <span className='userJobs__perHour'>/hr</span></h1>
                    <div className="userJobs__jobDetails">
                      <p><span className='userJobs__head'>Start Date:</span> {startDate.substring(0,10)}</p>
                      <p><span className='userJobs__head'>Company Name:</span> {companyName}</p>
                      <p><span className='userJobs__head'>Phone Number:</span> {contactPhoneNumber}</p>
                      <p><span className='userJobs__head'>Email Address:</span> {contactEmail}</p>
                      <p><span className='userJobs__head'>Duration:</span> {duration}</p>
                      <p><span className='userJobs__head'>Start Date:</span> {startDate.substring(0,10)}</p>
                      <p><span className='userJobs__head'>Description:</span> {description}</p>
                      <p><span className='userJobs__head'>Province:</span> {province}</p>
                      <p><span className='userJobs__head'>Region:</span> {region}</p>
                      <p><span className='userJobs__head'>City:</span> {city}</p>
                      <p><span className='userJobs__head'>Street Location:</span> {streetLocation}</p>
                    </div>
                    <div>
                    <div className='userJobs__editDelete-container'>
                      <button onClick={deleteJob} className='userJobs__btn'>Delete Job</button>
                      <Link className="userJobs__btn" to="/userJobs">back </Link>
                  </div>
          </div>
                          </div>}
                  </div>
                
              
          }
  
          
     
        </div>
          </div>
        </>
      )
 }
}

export default DeleteJob