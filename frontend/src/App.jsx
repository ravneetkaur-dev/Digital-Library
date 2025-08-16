import { Home } from './pages/Home';
import { About } from './pages/About';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Contact } from './pages/contact';
import { Resources } from './pages/Resources';
// import { FacultyDashboard } from './components/FacultyDashboard/FacultyDashboard';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminPage } from './pages/AdminPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
// import { FacultyDashboardPage } from './pages/FacultyDashboardPage';
import './App.css';


function App() {

  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          {/* <Route path="/paper" element={<Paper/>}/> */}
          {/* <Route path="/syllabus" element={<Syllabus/>}/> */}
          {/* <Route path="/econtent" element={<Econtent/>}/> */}
          <Route path="/contact" element={<Contact/>}/>
          {/* <Route path="/rules" element={<Rules/>}/> */}
          <Route path='/resources' element={<Resources/>}/>
          <Route path="/admin-dashboard" element={<AdminPage/>}/>
          <Route path="/departments" element={<DepartmentsPage/>} />
          {/* <Route path="/faculty-dashboard" element={<FacultyDashboardPage/>}/> */}
          {/* <Route path="/course/:courseId" element={<CourseDetails />} /> */}
        </Routes>
      </ScrollToTop>
    </>
  )
}

export default App
