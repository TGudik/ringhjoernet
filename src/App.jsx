import './App.css'
import Navigation from './components/navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'

function App() {

  return (
    <div>
      <Navigation/> 
      <main>
        <Outlet/>
      </main>
        <Footer/>
    </div>
  )
}

export default App
