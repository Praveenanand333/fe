import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import StudentLogin from './components/StudentLogin'
import StaffLogin from './components/StaffLogin'
import AdminLogin from './components/AdminLogin'
import StudentRegister from './components/StudentRegister'
import StudentDashboard from './components/StudentDashboard'
import StaffRegister from './components/StaffRegister'
import StaffDashboard from './components/StaffDashboard'
import CreateRoom from './components/CreateRoom'
import Student from './components/usercomponents/student'
import Teacher from './components/usercomponents/teacher'
import HOD from './components/usercomponents/hod'
import ViewStudentPersonal from './components/students/view/personaldata';
import ViewStudentAcademic from './components/students/view/academicdata';
import ViewStudentOther from './components/students/view/otherdata';
import EditStudentPersonal from './components/students/edit/personaldata';
import EditStudentOther from './components/students/edit/otherdata';
import Changepassword from './components/logincomponents/Changepassword';
import Visualization from './components/students/analytics/visulaize';
import EditStudentAcademic from './components/students/edit/academicdata';
import Staffviewpersonal from './components/teacher/view/staffviewpersonal';
import Staffviewacademic from './components/teacher/view/staffviewacademic';
import Staffviewother from './components/teacher/view/staffviewother';
import Teacheranalytics from './components/teacher/analytics/teacheranalytics';
import Data from './components/PDF/Data';
import Hodviewpersonal from './components/hod/hodviewpersonal';
import Hodviewacademic from './components/hod/hodviewacademic';
import Hodviewother from './components/hod/hodviewother';
import Hodanalytics from './components/hod/hodanalytics';
import'./components/CSS/change_pass.css'
import'./components/CSS/view.css'
import'./components/CSS/view_academicdata.css'
import'./components/CSS/viewotherdata.css'
import'./components/CSS/edit_otherdata.css'
import ResetPassword from './components/ResetPassword'
import AdminDashboard from './components/AdminDashboard'
import StudentData from './components/StudentData'
import StaffData from './components/StaffData'
import PDFData from './components/PDF/PDFGenerator'
import PDFData2 from './components/PDF/PDFGenerator2'
import ViewAttendance from './components/ViewAttendance'
import PrintAttendance from './components/PrintAttendance'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='student-login' element={<StudentLogin />}/>
        <Route path='staff-login' element={<StaffLogin />}/>
        <Route path='admin-login' element={<AdminLogin />}/>
        <Route path='student-register' element={<StudentRegister />}/>
        <Route path='staff-register' element={<StaffRegister />}/>
        <Route path='student/attendance' element={<StudentDashboard />} />
        <Route path='admin-dashboard' element={<AdminDashboard />}/>
        <Route path='staff/attendance' element={<StaffDashboard />}/>
        <Route path = 'staff/attendance/print' element={<PrintAttendance />}/>
        <Route path='create-room' element={<CreateRoom />}/>
        <Route path='reset-password/:role/:token' element={<ResetPassword />}/>
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/hod" element={<HOD />}/>
        <Route path="/student/view/personaldata" element={<ViewStudentPersonal />} />
        <Route path="/student/view/academicdata" element={<ViewStudentAcademic />} />
        <Route path="/student/view/otherdata" element={<ViewStudentOther />} />
        <Route path="/student/view/pdf" element={<PDFData />} />
        <Route path="/student/edit/personaldata" element={<EditStudentPersonal />} />
        <Route path="/student/edit/otherdata" element={<EditStudentOther />} />
        <Route path="/changepassword" element={<Changepassword/>}/>
        <Route path="/student/analytics" element={<Visualization />} />
        <Route path="/student/edit/academicdata" element={<EditStudentAcademic />} />
        <Route path="/staff/view/personaldata" element={<Staffviewpersonal />} />
        <Route path="/staff/view/academicdata" element={<Staffviewacademic />} />
        <Route path="/staff/view/otherdata" element={<Staffviewother />} />
        <Route path="/staff/view/pdf" element={<PDFData2 />} />
        <Route path="/staff/analytics" element={<Teacheranalytics/>} />
        <Route path="/admin/view/pdf" element={<PDFData2 />} />
        <Route path="/pdf" element={<Data/>} />
        <Route path='/admin/view/personaldata' element={<Hodviewpersonal />} />
        <Route path='/admin/view/academicdata' element={<Hodviewacademic />} />
        <Route path='/admin/view/otherdata' element={<Hodviewother />} />
        <Route path='/admin/analytics' element={<Hodanalytics/>} />
        <Route path='/admin/attendance' element={<AdminDashboard />} />
        <Route path='/admin/attendance/student' element={<StudentData />}/>
        <Route path='/admin/attendance/staff' element={<StaffData />}/>
      </Routes>
    </Router>
  )
}

export default App