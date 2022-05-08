// Router
/* 
  React router - used for matching a url to a function or component 
  Routes - used as a container for wrapping the routes
  Route - refers to each route in the application
*/
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Custom CSS
import './App.css';

// Layout
import Footer from './components/layout/Footer';

// Pages
import PageNotFound from './components/pages/PageNotFound';

// Components
import Jobs from './components/jobs/Jobs';
import Documentation from './components/Documentation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserJobs from './components/UserJobs/UserJobs';
import {createTheme, ThemeProvider } from '@mui/material/styles'
import AddJob from './components/UserJobs/AddJob';
import EditJob from './components/UserJobs/EditJob';
import DeleteJob from './components/UserJobs/DeleteJob';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#d93c2e'
    }
  },
  typography: {
    fontFamily: ['Poppins'],
    fontSize: 17,
    fontWeight: 700
  }
})

function App() {

  return (
    <div>
      <ThemeProvider theme={customTheme}>
      <Router>
       
       <Routes>
         <Route exact path='/' element={<Jobs/>} />

         <Route exact path='/login' element={<Login/>} />
         <Route exact path='/Register' element={<Register/>} />

         <Route exact path='/userJobs' element={<UserJobs/>} />
         <Route exact path='/userJobs/add' element={<AddJob/>} />
         <Route exact path='/userJobs/edit/:id' element={<EditJob/>} />
         <Route exact path='/userJobs/delete/:id' element={<DeleteJob/>} />
         <Route exact path='/documentation' element={<Documentation/>}/>

         <Route path='*' element={<PageNotFound/>} />
       </Routes>



     

     </Router>
      </ThemeProvider>
      <Footer/>
    </div>
  );
}

export default App;
