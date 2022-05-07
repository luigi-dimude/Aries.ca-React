import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

// Accesses the parameter passed by the user in the url to identify the user to be deleted
import { useParams } from 'react-router-dom'


import Navbar from '../layout/Navbar'
import CircularProgress from '@mui/material/CircularProgress';


import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker  } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';




const EditJob = () => {

  let navigate = useNavigate();


  // Retrieve the id of the job to be edited from the url 
  const { id } = useParams();

  const [getJobDetails, setGetJobDetails] = useState({

    title:'',
    hourlySalary:0,
    contactPhoneNumber:0,
    companyName: '',
    contactEmail: '',
    duration: '',
    description:'',
    province:'Ontario',
    region:'Greater Toronto Area',
    city: '',
    streetLocation:''

  })

  const {title, hourlySalary, companyName, contactPhoneNumber, duration, description, city, contactEmail, streetLocation} = getJobDetails

  const [date, setDate] = useState(new Date())
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [jobEdited, setJobEdited] = useState(false)
  const [errorAlert, setErrorAlert] = useState('')





  // On Page load
  useEffect( () => {
    auth();
    getAddresses();
    getJob();

    
  }, []);

  const auth = () => {
    const username = localStorage.getItem('jobs-aries-username');
    const token = localStorage.getItem("jobs-aries-token")

    if (!username || !token) {
      navigate('/')

    }
  }


  const getAddresses = async() => {
    try {
      const res = await Axios.get(`https://jobs-api-arie.herokuapp.com/api/v1/addresses?province=Ontario&region=`);

      setAddresses(res.data.addresses);
      setLoading(false)
    }
    catch(err) {
      console.log(err)
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
      setGetJobDetails({...getJobDetails, ...job, city:job.address.city})
      setDate(job.startDate)

    }
    catch(err) {
      console.log(err)
      navigate("/userJobs");

    }
  }

  const handleChange = e => {
    setGetJobDetails({...getJobDetails, [e.target.name]: e.target.value});
  }

  const editJob = async(e) => {
    e.preventDefault();

    try {
       
      const send = {...getJobDetails, startDate: date}

      const res = await Axios.patch(`https://jobs-api-arie.herokuapp.com/api/v1/user-jobs/${id}`, {
        ...send
      },
      {
          headers: {
          "Authorization": "Bearer " + localStorage.getItem("jobs-aries-token"),
        }
      }
      );


      setJobEdited(true)

    }
    catch(err) {
      console.log(err)

      setErrorAlert(err.response.data.msg)

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

  return (
    <>
        <Navbar/> 
     
        <div className="mt mb container">
         
            {jobEdited ? <div className="userJobs__container">
            <div className="userJobs__card">
            <div className="align-center">
                <h1>Successfully Edited</h1>
              </div>
            </div>
            </div> : 
            <div className="userJobs__card">
            <form className='form__container'>
              <div className="errorAlert">
                  {errorAlert ? <span>{errorAlert}</span> : null }
                </div>
                <div className="form-group">
                    <label>Job Title : </label>
                    <input className="form-text2" name="title" value={title} onChange={handleChange} type="text" required />
                </div>
                <div className="form-group">
                    <label>Hourly Salary : </label>
                    <input className="form-text2" name="hourlySalary" value={hourlySalary} onChange={handleChange} type="number" required />
                </div>
                <div className="form-group">
                    <label>Company Name : </label>
                    <input className="form-text2" name="companyName" value={companyName} onChange={handleChange} type="text" required />
                </div>
                <div className="form-group">
                    <label>Phone Number : </label>
                    <input className="form-text2" name="contactPhoneNumber" value={contactPhoneNumber} onChange={handleChange} type="number" required />
                </div>
                <div className="form-group">
                    <label>Email : </label>
                    <input className="form-text2" name="contactEmail" value={contactEmail} onChange={handleChange} type="text" required />
                </div>
                <div className="form-group">
                    <label>Description : </label>
                    <input className="form-text2" name="description" value={description} onChange={handleChange} type="text" required />
                </div>
                <div className="form-group">
                    <label>Street Location : </label>
                    <input className="form-text2" name="streetLocation" value={streetLocation} onChange={handleChange} type="text" required />
                </div>
                <div className="form-group">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                        label="Start Date"
                        disablePast={true}
                        value={date}
                        format="YYYY-MM-DD"
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                </LocalizationProvider>
                </div>
                <div className="form-group">
                  <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <Select
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value="Ontario"
                    >
                            <MenuItem value="Ontario">
                              Ontario
                            </MenuItem>
                            <MenuItem value="">
                              <em>coming soon...</em>
                              </MenuItem>
                    </Select>
                      </FormControl>
                </div>
                <div className="form-group">
                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                          <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            value="GTA"
                          >
                            <MenuItem value="GTA">
                              GTA
                            </MenuItem>
                            <MenuItem value="">
                              <em>coming soon...</em>
                              </MenuItem>
                          </Select>
                        </FormControl>
                </div>
                <div className="form-group">
                <FormControl variant="filled" sx={{ minWidth: 120 }}>
                            <InputLabel id="AddressID">City</InputLabel>
                            <Select
                              name='city'
                              labelId="AddressID"
                              id="Addresses"
                              value={city}
                              label="City"
                              onChange={handleChange}>
                                {addresses.map(address => {
                                  return(
                                  <MenuItem key={address._id} value={address.city}>{address.city}</MenuItem>
                                  )
                                })}
                            </Select>
                          </FormControl>
                </div>
                <div className="form-group">
                    <FormControl variant="filled" sx={{ minWidth: 120 }}>
                            <InputLabel id="durationId">Duration</InputLabel>
                            <Select
                              name='duration'
                              labelId="durationId"
                             
                              value={duration}
                              label="Duration"
                              onChange={handleChange}>
                                <MenuItem value={'Within a day'}>Within a day</MenuItem>
                                <MenuItem value={'Few days'}>Few days</MenuItem>
                                <MenuItem value={'More than few days'}>More than few days</MenuItem>
                                <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
                                <MenuItem value={'N/A'}>N/A</MenuItem>
                            </Select>
                          </FormControl>
                </div>
                <div className="userJobs__editDelete-container">
                  <button className="userJobs__btn" onClick={editJob}>Edit Job</button>
                  <Link className="userJobs__btn" to="/userJobs">back </Link>
                </div>
               
               

                
            </form>
            </div>
            }
        
        </div>
    
    </>
  )
}

export default EditJob