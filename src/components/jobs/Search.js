import React from 'react'
import { useState, useContext, useEffect } from 'react';
import Axios from 'axios'

// Material UI
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { JobContext } from '../contexts/jobsContext';



const Search = () => {

  // Context
  const { setRequest, setNumOfJobs, setCurrentPage} = useContext(JobContext)


  // State
  const [getJobs, setGetJobs] = useState({

    search: '',
    address:'Any',
    duration: 'Any',
    salary:[0,45]

  })

  
  const [addresses, setAddresses] = useState([])

  
  // Get properties from state obj
  let {search, address, salary, duration} = getJobs;
  const min_salary = salary[0]
  const max_salary = salary[1]

  // On Page load
  useEffect(() => {
    
    getAddresses();

    
  }, []);

  const getAddresses = async() => {
    try {
      const res = await Axios.get(`https://jobs-api-arie.herokuapp.com/api/v1/addresses?province=Ontario&region=`);

      setAddresses(res.data.addresses);
    }
    catch(err) {
      console.log(err)
    }
  }

  const fetchFilteredJobs = async (e) => {
    e.preventDefault();
    try {
      let maxSalary;
      max_salary === 55 ? maxSalary = 10000 : maxSalary = max_salary;

      const res = await Axios.get(`https://jobs-api-arie.herokuapp.com/api/v1/jobs?search=${search}&address=${address}&duration=${duration}&salaryRange=${min_salary}-${maxSalary}`);
      let jobs = res.data.jobs;

      setNumOfJobs(jobs.length)
      const req = `https://jobs-api-arie.herokuapp.com/api/v1/jobs?search=${search}&address=${address}&duration=${duration}&salaryRange=${min_salary}-${maxSalary}`
      setRequest(req)
      setCurrentPage(1)

      
  
    }
    catch(err) {
      console.log('Something went wrong.....')
      console.log(err)

    }
  
  } 

  const handleChange = e => {
    setGetJobs({...getJobs, [e.target.name]: e.target.value});
  }

  const marks = [
    {
      value: 5,
      label: '$5',
    },
    {
      value: 15,
      label: '$15',
    },
    {
      value: 25,
      label: '$25',
    },
    {
      value: 35,
      label: '$35',
    },
    {
      value: 45,
      label: '$45',
    },
    {
      value: 55,
      label: '$55+',
    },
  ];

  function formatter(num) {
    return '$' + num;
  }

  return (
    <div className='mt'>
           <div className="container">
                <div className="search__container">
                  <form action="">
                    <div className="search__card">
                        <div className="">
                          <input className='search__bar mb-3' type="text" name="search" id="search" 
                          placeholder='Search for jobs' value={search} onChange={handleChange}/>
                            
                        </div>
                          <div className="search__slider mb-3">
                            <Slider
                            name='salary'
                            style={{ maxWidth: 500 }}
                            value={[min_salary, max_salary]}
                            onChange={handleChange}
                            valueLabelFormat={formatter}
                            valueLabelDisplay="on" 
                            disableSwap
                            marks={marks}
                            max={55}
                            min={5}
                          />
                          </div>
                          <div className="search__select-container mb-3">
                          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
                          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
                          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="idlabel">City</InputLabel>
                            <Select
                              name='address'
                              labelId="idlabel"
                              id="Address"
                              value={address}
                              label="City"
                              onChange={handleChange}>
                                  <MenuItem value='Any'>Any</MenuItem>
                                {addresses.map(address => {
                                  return(
                                  <MenuItem key={address._id} value={address._id}>{address.city}</MenuItem>
                                  )
                                })}
                            </Select>
                          </FormControl>
                          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="idlabel2">Duration</InputLabel>
                            <Select
                              name='duration'
                              labelId="idlabel2"
                              id="duration"
                              value={duration}
                              label="Duration"
                              onChange={handleChange}>
                                <MenuItem value={'Any'}>Any</MenuItem>
                                <MenuItem value={'Within a day'}>Within a day</MenuItem>
                                <MenuItem value={'Few days'}>Few days</MenuItem>
                                <MenuItem value={'More than few days'}>More than few days</MenuItem>
                                <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
                            </Select>
                          </FormControl>
                          </div>
                          <div className="search__button-container mb-3">
                          <button className='search__button' onClick={fetchFilteredJobs}>Search</button>
                          </div>
                      </div>
                  </form>
                </div>
           </div>
    </div>
  )
}

export default Search