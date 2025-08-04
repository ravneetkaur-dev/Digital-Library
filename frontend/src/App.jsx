import { Home } from './pages/home';
import { About } from './pages/about';
import { Paper } from './pages/Paper';
import { Syllabus } from './pages/Syllabus';
import { Econtent } from './pages/Econtent';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Contact } from './pages/Contact';
import { Rules } from './pages/Rule';
import { AdminDashboard } from './pages/AdminDashboard';
import { CourseDetails } from './pages/CourseDetails';
import { FacultyDashboard } from './components/FacultyDashboard/FacultyDashboard';
import { ScrollToTop } from './components/ScrollToTop';


function App() {

  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/paper" element={<Paper/>}/>
          <Route path="/syllabus" element={<Syllabus/>}/>
          <Route path="/econtent" element={<Econtent/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/rules" element={<Rules/>}/>
          <Route path="/api/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/faculty" element={<FacultyDashboard/>}/>
          <Route path="/course/:courseId" element={<CourseDetails />} />
        </Routes>
      </ScrollToTop>
    </>
  )
}

export default App
