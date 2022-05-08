import React, {useEffect} from 'react'

export const Documentation = () => {

    // On Page load
   useEffect( () => {

    window.location.assign('https://jobs-api-arie.herokuapp.com/api-docs/');
    
 

    
  }, []);

  return (
    <div></div>
  )
}


export default Documentation

