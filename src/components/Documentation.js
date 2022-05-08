import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export const Documentation = () => {
    let navigate = useNavigate();

    // On Page load
   useEffect( () => {

    window.location.assign('https://jobs-api-arie.herokuapp.com/api-docs/');
    
 

    
  }, []);

  return (
    <div></div>
  )
}


export default Documentation

