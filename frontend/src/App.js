import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PlaySongComponent from './component/playSong/PlaySongComponent';
import LoginContext from './context/login/loginContext';
import Artist from './router/Artist';
import Collection from './router/Collection';
import Home from './router/Home';
import LibraryComponent from './router/LibraryComponent';
import Login from './router/Login';
import PageNotFound from './router/PageNotFound';
import Playlist from './router/Playlist';
import Search from './router/Search';
import Signup from './router/Signup';


function App() {
  const loginContext = useContext(LoginContext);


  return (
    <>
        <div className="App w-screen h-screen">
          <BrowserRouter>
            {/* <CookiesProvider> */}
              { !loginContext.isAuthenticate?(<>
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/signup' element={<Signup />}/>
                  <Route path='/search/:item?' element={<Search />}/>
                  <Route path='/artist/:key' element={<Artist />} />
                  <Route path='/playlist/:key' element={<Playlist />} />
                  <Route path='/collection/likesong/' element={<Collection />} />
                  <Route path='/library' element={<LibraryComponent />} />
                  <Route path='/not-found' element={<PageNotFound />} />
                  <Route path='/*' element={<Navigate to={'/'}/>} />
                </Routes>
                <div className='h-20 w-full p-2 text-[#fff] bg-black'>
                  <PlaySongComponent />
                </div>
                </>):(
                <>
                  {loginContext.isAuthenticate?(<>
                    <Routes>
                      <Route path='/' element={<Home />}/>
                      <Route path='/search/:item?' element={<Search />}/>
                      <Route path='/artist/:key' element={<Artist />} />
                      <Route path='/playlist/:key' element={<Playlist />} />
                      <Route path='/collection/likesong/' element={<Collection />} />
                      <Route path='/library' element={<LibraryComponent />} />
                      <Route path='/not-found' element={<PageNotFound />} />
                      <Route path='*' element={<Navigate to={'/'}/>} />
                    </Routes>
                    <div className='h-20 w-full p-2 text-[#fff] bg-black'>
                    <PlaySongComponent />
                  </div>
                </>
                ):(<></>)}
              </>)}
            {/* </CookiesProvider> */}
          </BrowserRouter>
        </div>
        {/* <div className='h-20 w-full p-2 bg-black'>
            hello
        </div> */}
        {/* <PlaySongComponent /> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          theme="colored"
        />
    </>
  );
}

export default App;
