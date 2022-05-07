import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from './logo.svg'


const Navbar = () => {

  let navigate = useNavigate();


  const [loggedIn, setLoggedIn] = useState(false)

  useEffect( () => {
    const username = localStorage.getItem('jobs-aries-username');
    if (username) setLoggedIn(true);
  })

  const logout = e => {
    e.preventDefault();

    localStorage.setItem("jobs-aries-token", '')
    localStorage.setItem("jobs-aries-username", '')
    setLoggedIn(false)

    navigate('/')
  }



  if (loggedIn) {
    return (
      <header className='navbar'>
              <div className="container">
                  <div className="navbar__container">
                      <div className="navbar__logo"><Link to="/"><img src={Logo} alt="Logo" /></Link></div>
                      <div className="navbar__links">
                          <ul className='navbar__ul'>
                              <li className='navbar__li navbar__user'>Hello, <span className='navbar__user-name'>{localStorage.getItem('jobs-aries-username')}</span></li>
                              <li className='navbar__li'><Link className='navbar__link' to="/userJobs">View Jobs</Link></li>
                              <li className='navbar__li'><Link className='navbar__link' to="/" onClick={logout}>Log out</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
      </header>
    )
  }

  else {
    return (
      <header className='navbar'>
              <div className="container">
                  <div className="navbar__container">
                      <div className="navbar__logo"><Link to="/"><img src={Logo} alt="Logo" /></Link></div>
                      <div className="navbar__links">
                          <ul className='navbar__ul'>
                              <li className='navbar__li'><Link className='navbar__link' to="/Login">Login</Link></li>
                              <li className='navbar__li'><Link className='navbar__link' to="/Register">Register</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
      </header>
    )
  }
}

export default Navbar;