import Header from './components/Header'
import Login from './components/Login'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import NotFound from './error/NotFound'
import { useAuth } from './components/context/AuthContext'
import MainLayout from './components/MainLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import EmployeeDashboard from './components/employee/EmployeeDashboard'
import Employees from './components/admin/Employees'
import AdminOnboarding from './components/admin/AdminOnboarding'
import LeaveRequests from './components/admin/LeaveRequests'
import Profile from './components/employee/Profile'
import ApplyLeave from './components/employee/ApplyLeave'
import LeaveHistory from './components/employee/LeaveHistory'
import Payroll from './components/employee/Payroll'
import UnAuth from './error/UnAuth'
import AuthGuard from './components/guard/AuthGuard'
import ApplyLeaveConfirmation from './components/employee/ApplyLeaveConfirmation'
import EditProfile from './components/employee/EditProfile'
import EditProfileConfirmation from './components/employee/EditProfileConfirmation'
import ViewEmployee from './components/admin/ViewEmployee'
import EditEmployee from './components/admin/EditEmployee'
import AddEmployee from './components/admin/AddEmployee'
import AddPayroll from './components/admin/AddPayroll'
import ViewAllPayroll from './components/admin/ViewAllPayroll'

function App() {
  const { isLoggedIn, role } = useAuth();
  return (
    <>
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<UnAuth />} />

        {/* Role based routes use the MainLayout which conditionally renders the sidebar based on the type of role */}

        {/* These child routes will be rendered in the <Outlet /> of MainLayout */}

        <Route path="/admin/*" element={
            <MainLayout />}>
          
          <Route path="" index element={
            <AuthGuard allowedRoles={['admin']}><AdminDashboard /></AuthGuard>} />
          <Route path="dashboard" element={
            <AuthGuard allowedRoles={['admin']}><AdminDashboard /></AuthGuard>} />
          <Route path="employees" element={<Employees />}/>
          <Route path="employees/:id" element={<ViewEmployee />}/>
          <Route path="employees/:id/edit-employee" element={<EditEmployee />}/>
          <Route path="employees/add-employee" element={<AddEmployee />}/>
          <Route path="admin-onboarding" element={
            <AuthGuard allowedRoles={['admin']}>
                <AdminOnboarding />
            </AuthGuard>} />  
          <Route path="leave-requests" element={
            <AuthGuard allowedRoles={['admin']}>
                <LeaveRequests />
            </AuthGuard>} />
          <Route path="add-payroll" element={
            <AuthGuard allowedRoles={['admin']}>
                <AddPayroll />
            </AuthGuard>} />
             <Route path="view-all-payroll" element={
            <AuthGuard allowedRoles={['admin']}>
                <ViewAllPayroll />
            </AuthGuard>} />
        </Route>

        {/* Employee Routes */}

        <Route path="/employee/*" element={<MainLayout />}>
          {/* These child routes will be rendered in the <Outlet /> of MainLayout */}
          <Route path="" index element={
            <AuthGuard allowedRoles={['employee']}>
                <EmployeeDashboard />
            </AuthGuard>} />
          <Route path="employee-dashboard" element={
            <AuthGuard allowedRoles={['employee']}>
                <EmployeeDashboard />
            </AuthGuard>} />
          <Route path="profile" element={
            <AuthGuard allowedRoles={['employee']}>
                <Profile />
            </AuthGuard>} />
            <Route path="edit-profile" element={
              <AuthGuard allowedRoles={['employee']}>
                  <EditProfile />
              </AuthGuard>} />
              <Route path="edit-profile-confirmation" element={
              <AuthGuard allowedRoles={['employee']}>
                  <EditProfileConfirmation />
              </AuthGuard>} />
          <Route path="apply-leave" element={
            <AuthGuard allowedRoles={['employee']}>
                <ApplyLeave />
            </AuthGuard>} />
            <Route path="apply-leave-confirmation" element={
            <AuthGuard allowedRoles={['employee']}>
                <ApplyLeaveConfirmation />
            </AuthGuard>} /> 
          <Route path="leave-history" element={
            <AuthGuard allowedRoles={['employee']}>
                <LeaveHistory />
            </AuthGuard>} />
          <Route path="payroll" element={
            <AuthGuard allowedRoles={['employee']}>
                <Payroll />
            </AuthGuard>} />
        </Route> 

        {/* call all catch  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </>
  )
}

export default App
