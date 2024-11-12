import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/SignUp'
import { Signin } from './pages/SignIn'
import { Blog } from './pages/Blog'
import {Home} from './pages/Home';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App