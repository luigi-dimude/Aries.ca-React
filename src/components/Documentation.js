import React, {useEffect} from 'react'

export const Documentation = () => {

    // On Page load
   useEffect( () => {

    window.location.assign('https://jobs-api-arie.herokuapp.com/api-docs/');
    
 

    
  }, []);

  return (
    <div>
      <a href="https://jobs-api-arie.herokuapp.com/api-docs/">Docs</a>
    </div>
  )
}


export default Documentation

