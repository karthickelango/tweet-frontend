import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import './assets/styles/style.scss'
import AddTweet from './pages/AddTweet';
import Details from './pages/Details';
import Users from './pages/Users';
import Feeds from './pages/Feeds';
import { DataProvider } from './context/DataContext';
import EditTweet from './pages/EditTweet';
import DeleteTweet from './pages/DeleteTweet';
import { ForgetPassword } from './pages/ForgetPassword';
import { ResetPassword } from './pages/ResetPassword';

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
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
            </Routes>
            :
            <>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/feed' element={<Feeds />}></Route>
                <Route path='/users' element={<Users />}></Route>
                <Route path='/profile' element={<Account />}></Route>
                <Route path='/addtweet' element={<AddTweet />}></Route>
                <Route path='/:id' element={<Details />}></Route>
                <Route path="/tweet/edit/:id" element={<EditTweet />} />
                <Route path="/tweet/delete/:id" element={<DeleteTweet />} />
              </Routes>
            </>
        }
      </DataProvider>
    </div>
  );
}



export default App;
