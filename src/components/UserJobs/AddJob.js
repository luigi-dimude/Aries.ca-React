import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Navbar from '../layout/Navbar'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker  } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';





const AddJob = () => {

  let navigate = useNavigate();


    // State
  const [getJobDetails, setGetJobDetails] = useState({

    title:'',
    hourlySalary:null,
    contactPhoneNumber:null,
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

  const [jobCreated, setJobCreated] = useState(false)

  const [errorAlert, setErrorAlert] = useState('')

   // On Page load
   useEffect( () => {

    auth();
    getAddresses();
 

    
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
    }
    catch(err) {
      console.log(err)
    }
  }

  const handleChange = e => {
    setGetJobDetails({...getJobDetails, [e.target.name]: e.target.value});
  }

  const addJob = async(e) => {
    e.preventDefault();

    try {
       
      const send = {...getJobDetails, startDate: date}

      const res = await Axios.post(`https://jobs-api-arie.herokuapp.com/api/v1/user-jobs`, {
        ...send
      },
      {
          headers: {
          "Authorization": "Bearer " + localStorage.getItem("jobs-aries-token"),
        }
      }
      );


      setJobCreated(true)
 

    }
    catch(err) {
     
      setErrorAlert(err.response.data.msg)
      window.scrollTo(0, 0)
    }
  }



  return (
    <>
        <Navbar/> 
        <div className="mt mb container">
              {jobCreated ? <div className='userJobs__container'>
                <div className="addJob__card">
                <div className="align-center">
                  <h1>Successfully Created</h1>
                </div>
              </div>
              </div> : 
            <div className="addJob__card">  
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
                    <textarea className="text-area" name="description" value={description} onChange={handleChange} type="text" rows='7' required />
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
                  <button className="userJobs__btn" onClick={addJob}>Add Job</button>
                  <Link className="userJobs__btn" to="/userJobs">back </Link>
                </div>
               
               

                
            </form>
            </div>}
        
        </div>
    </>
  )
}

export default AddJob