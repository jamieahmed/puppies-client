import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddPuppy from './pages/AddPuppy/AddPuppy'
import * as puppyService from './services/puppyService'
import PuppyList from './pages/PuppyList/PuppyList'
import EditPuppy from './pages/EditPuppy/EditPuppy'

const App = () => {
  const [puppies, setPuppies] = useState([])
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllPuppies = async () => {
      const puppyData = await puppyService.getAll()
      setPuppies(puppyData)
    }
    fetchAllPuppies()
  }, [])

  
  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddPuppy = async (newPuppyData, photo) => {
    const newPuppy = await puppyService.create(newPuppyData)
    if (photo) {
      newPuppy.photo = await puppyPhotoHelper(photo, newPuppy._id)
    }
    setPuppies([...puppies, newPuppy])
    navigate('/')
  }

  const handleDeletePuppy = async id => {
    const deletedPuppy = await puppyService.deleteOne(id)
    setPuppies(puppies.filter(puppy => puppy._id !== deletedPuppy._id))
  }

  const handleUpdatePuppy = async (updatedPuppyData, photo) => {
    const updatedPuppy = await puppyService.update(updatedPuppyData)
    if (photo) {
      updatedPuppy.photo = await puppyPhotoHelper(photo, updatedPuppy._id)
    }
    const newPuppiesArray = puppies.map(puppy => 
      puppy._id === updatedPuppy._id ? updatedPuppy : puppy 
    )
    setPuppies(newPuppiesArray)
    navigate('/')
  }

  const puppyPhotoHelper = async (photo, id) => {
    const photoData = new FormData()
    photoData.append('photo', photo)
    return await puppyService.addPhoto(photoData, id)
  }

  return (
    <>
      <div className='App'>
        <NavBar user={user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route
              path="/signup"
              element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
            />
            <Route
              path="/"
              element={
                <PuppyList 
                  handleDeletePuppy={handleDeletePuppy} 
                  puppies={puppies}
                  user={user}
                />
              }
            />
            <Route
              path="/add"
              element={<AddPuppy handleAddPuppy={handleAddPuppy} />}
            />
            <Route
              path="/edit"
              element={<EditPuppy handleUpdatePuppy={handleUpdatePuppy} />}
            />
            <Route
              path="/login"
              element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
            />
            <Route
              path="/profiles"
              element={user ? <Profiles /> : <Navigate to="/login" />}
            />
            <Route
              path="/changePassword"
              element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
