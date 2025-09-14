
import './App.css'
import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import TodoTask from './component/TodoTask'

function App() {

  const user = localStorage.getItem("token")

  return (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate replace to="/signup" />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        {user && <Route path='/todo' element={<TodoTask/>}/>}
      </Routes>
    </Router>

  </>
  )
}

export default App
