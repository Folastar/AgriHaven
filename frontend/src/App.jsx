import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Login from './pages/Auth/Login'

function App() {

  return (
    <>
      <ToastContainer/>
      <Navigation/>
      {/* <Login/> */}
      <main className='py-3'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
