import React, { useState, useEffect } from 'react'
import {useContext} from 'react'
import { JobContext } from './contexts/jobsContext'


const Pagination = () => {

  const LIMIT = 10

  const [pages, setPages] = useState(0)

  

 


    const {setCurrentPage, numOfJobs, currentPage} = useContext(JobContext)

    useEffect( () => {

      try {
        
        const numPages =  getNumPages(numOfJobs, LIMIT)
        setPages(numPages)
        console.log('tr',pages)
        
  
      }
      catch(err) {
        console.log(err)
      }
    }, [numOfJobs])

    const getNumPages = (numJobs, limit) => {
      return Math.ceil(numJobs/limit)
    }

  return (
    <div className='container mb'>
        <ul className='pagination__ul'>
        {
            [...Array(pages)].map((e, i) => {
                return(<li key={i+1}><button className={i+1 === currentPage? 'pagination__button pagination__button-active' : 'pagination__button'} onClick={()=> setCurrentPage(i+1)}>{i+1}</button></li>)
            })
        }
        </ul>
    </div>
  )
}

export default Pagination