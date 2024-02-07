import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import './assets/styles/style.css'
import AddBooks from './pages/AddBooks';
import Details from './pages/Details';
import Users from './pages/Users';
import Feeds from './pages/Feeds';
import { DataProvider } from './context/DataContext';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <div className="App">
      <DataProvider>
        {
          !isUserSignedIn ?
            <Routes>
              <Route path='/' element={<Login />}></Route>
              <Route path='/signup' element={<SignUp />}></Route>
            </Routes>
            :
            <>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/feed' element={<Feeds />}></Route>
                <Route path='/users' element={<Users />}></Route>
                <Route path='/profile' element={<Account />}></Route>
                <Route path='/addtweet' element={<AddBooks />}></Route>
                <Route path='/:id' element={<Details />}></Route>
              </Routes>
            </>
        }
      </DataProvider>
    </div>
  );
}



export default App;
