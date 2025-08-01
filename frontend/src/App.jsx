import { Home } from './pages/home';
import { About } from './pages/about';
import { Contact } from './pages/contact';
import { AdminDashboard } from './pages/AdminDashboard';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          {/* <Route path="/paper" element={<Paper/>}/> */}
          {/* <Route path="/syllabus" element={<Syllabus/>}/> */}
          {/* <Route path="/econtent" element={<Econtent/>}/> */}
          <Route path="/contact" element={<Contact/>}/>
          {/* <Route path="/rules" element={<Rules/>}/> */}
          <Route path="/api/admin/dashboard" element={<AdminDashboard/>}/>
          {/* <Route path="/product-details/:id" element={<ProductDetail />} /> */}
        </Routes>
    </>
  )
}

export default App
