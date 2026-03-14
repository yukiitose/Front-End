import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import Login from './components/auth/Login.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Students from './components/dashboard/Students.jsx'
import Courses from './components/dashboard/Courses.jsx'
import WeatherWidget from './components/weather/WeatherWidget.jsx'
import ForgotPassword from './components/auth/ForgotPassword.jsx'
import ResetPassword from './components/auth/ResetPassword.jsx'
import CreatePassword from './components/auth/CreatePassword.jsx'
import Register from './components/auth/Register.jsx'

import Account        from './components/dashboard/Account.jsx'
import Consent        from './components/dashboard/Consent.jsx'
import SwitchSemester from './components/dashboard/SwitchSemester.jsx'


const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/students',  label: 'Students',  icon: '👥' },
  { to: '/courses',   label: 'Courses',   icon: '📚' },
  { to: '/weather',   label: 'Weather',   icon: '🌤' },
]

function Sidebar({ open, setOpen }) {
  const location     = useLocation()
  const { user }     = useAuth()

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={()=>setOpen(false)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:149,display:'none'}}
          className="mobile-overlay"
        />
      )}

      <div className={`sidebar${open?' sidebar-open':''}`} style={{
        width:230,minHeight:'100vh',background:'#fff',
        borderRight:'1px solid #e5e7eb',
        display:'flex',flexDirection:'column',
        flexShrink:0,
        boxShadow:'2px 0 8px rgba(0,0,0,0.04)',
        zIndex:150,
      }}>

        {/* Logo */}
        <div style={{padding:'20px 16px',borderBottom:'1px solid #f0f0f0',display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:52,height:52,borderRadius:'50%',border:'3px solid #fff',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 2px 8px rgba(183,28,28,0.2)'}}>
            <img src="/um-logo.png" alt="UM" style={{width:'100%',height:'100%',objectFit:'cover'}}
              onError={e=>e.target.style.display='none'}/>
          </div>
          <div>
            <div style={{fontWeight:800,fontSize:13}}><span style={{color:'#B71C1C'}}>UM Tagum</span></div>
            <div style={{color:'#888',fontSize:10,marginTop:2}}>Student Portal</div>
            <div style={{color:'#B71C1C',fontSize:10,fontWeight:600}}>Tagum Campus</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{flex:1,padding:'8px 0'}}>
          {navItems.map(item => {
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to}
                onClick={()=>setOpen(false)}
                style={{
                  display:'flex',alignItems:'center',gap:12,
                  padding:'12px 16px',textDecoration:'none',
                  background: active?'#B71C1C':'transparent',
                  color:      active?'#fff':'#555',
                  fontWeight: active?700:400,
                  fontSize:14,
                  borderLeft: active?'4px solid #7f0000':'4px solid transparent',
                }}>
                <span style={{fontSize:16}}>{item.icon}</span>
                <span>{item.label}</span>
                {active && <span style={{marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'#fff'}}/>}
              </Link>
            )
          })}
        </nav>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            position: fixed !important;
            top: 0; left: 0;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sidebar.sidebar-open {
            transform: translateX(0) !important;
          }
          .mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}

function Topbar({ open, setOpen }) {
  const location         = useLocation()
  const navigate         = useNavigate()
  const { user, logout } = useAuth()
  const title            = navItems.find(n => n.to === location.pathname)
  const [dropOpen, setDropOpen] = React.useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div style={{height:64,background:'#ffffff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>

      {/* Left — Hamburger + Title */}
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <button
          onClick={()=>setOpen(!open)}
          className="hamburger-btn"
          style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)',borderRadius:8,padding:'6px 10px',cursor:'pointer',color:'#444242',fontSize:18,display:'none'}}
        >
          {open ? '✕' : '☰'}
        </button>
        <h2 style={{color:'#444242',fontWeight:800,fontSize:18,margin:0}}>
          {title ? `${title.icon} ${title.label}` : ''}
        </h2>
      </div>

      {/* Right — User Dropdown */}
      <div style={{position:'relative'}}>
        <button
          onClick={()=>setDropOpen(!dropOpen)}
          style={{display:'flex',alignItems:'center',gap:8,background:dropOpen?'rgba(255,255,255,0.15)':'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',cursor:'pointer',padding:'7px 12px',borderRadius:8}}
        >
          <div style={{width:30,height:30,borderRadius:'50%',background:'#B71C1C',border:'2px solid rgba(255,255,255,0.5)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span style={{color:'#000000',fontWeight:800,fontSize:13}}>{user?.name?.charAt(0)}</span>
          </div>
          <span className="username-text" style={{color:'#444242',fontWeight:700,fontSize:13,textTransform:'uppercase'}}>{user?.name}</span>
          <div style={{position:'relative'}}>
            <span style={{fontSize:16}}>🔔</span>
            <span style={{position:'absolute',top:-6,right:-6,background:'#fff',color:'#B71C1C',borderRadius:'50%',width:16,height:16,fontSize:9,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>8</span>
          </div>
          <span style={{color:'rgba(255,255,255,0.7)',fontSize:10}}>{dropOpen?'▲':'▼'}</span>
        </button>

        {dropOpen && (
          <>
            <div onClick={()=>setDropOpen(false)} style={{position:'fixed',inset:0,zIndex:99}}/>
            <div style={{position:'absolute',right:0,top:'calc(100% + 8px)',background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,boxShadow:'0 8px 24px rgba(0,0,0,0.12)',minWidth:200,zIndex:100,overflow:'hidden'}}>
              <div style={{padding:'14px 16px',background:'#fef2f2',borderBottom:'1px solid #fecaca'}}>
                <div style={{color:'#B71C1C',fontWeight:700,fontSize:13}}>{user?.name}</div>
                <div style={{color:'#aaa',fontSize:11,marginTop:2}}>{user?.email}</div>
              </div>
              {[
                { label:'Account',         to:'/account'},
                {label:'Consent',         to:'/consent'},
                {label:'Switch Semester', to:'/switch-semester'}
              ].map(item=>(
                <button key={item.label} onClick={()=>{ setDropOpen(false); navigate(item.to) }}
                style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'13px 16px',background:'none',border:'none',borderBottom:'1px solid #f5f5f5',color:'#333',fontSize:14,cursor:'pointer',textAlign:'left',fontWeight:500}}
                onMouseEnter={e=>e.currentTarget.style.background='#fef2f2'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}
              >
                <span>{item.icon}</span><span>{item.label}</span>
              </button>
              ))}
              <button onClick={handleLogout}
                style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'13px 16px',background:'none',border:'none',color:'#B71C1C',fontSize:14,cursor:'pointer',textAlign:'left',fontWeight:700}}
                onMouseEnter={e=>e.currentTarget.style.background='#fef2f2'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}
              >
                <span></span><span>Logout</span>
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: block !important; }
          .username-text { display: none !important; }
        }
      `}</style>
    </div>
  )
}

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#f3f3f3'}}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'auto',minWidth:0}}>
        <Topbar open={sidebarOpen} setOpen={setSidebarOpen}/>
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return (
    <div style={{minHeight:'100vh',background:'#f3f3f3',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:40,height:40,border:'3px solid rgba(183,28,28,0.2)',borderTop:'3px solid #B71C1C',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 12px'}}/>
        <p style={{color:'#B71C1C',fontSize:14,fontWeight:600,margin:0}}>Loading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route path="/"                element={<Navigate to={isAuthenticated?'/dashboard':'/login'} replace/>}/>
      <Route path="/login"           element={isAuthenticated?<Navigate to="/dashboard" replace/>:<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password"  element={<ResetPassword/>}/>
      <Route path="/create-password" element={<CreatePassword/>}/>
      <Route path="/register"        element={<Register/>}/>
      <Route path="/dashboard"       element={<ProtectedRoute><Layout><Dashboard/></Layout></ProtectedRoute>}/>
      <Route path="/students"        element={<ProtectedRoute><Layout><Students/></Layout></ProtectedRoute>}/>
      <Route path="/courses"         element={<ProtectedRoute><Layout><Courses/></Layout></ProtectedRoute>}/>
      <Route path="/weather"         element={<ProtectedRoute><Layout><WeatherWidget/></Layout></ProtectedRoute>}/>
      <Route path="/account"         element={<ProtectedRoute><Layout><Account/></Layout></ProtectedRoute>}/>
      <Route path="/consent"         element={<ProtectedRoute><Layout><Consent/></Layout></ProtectedRoute>}/>
      <Route path="/switch-semester" element={<ProtectedRoute><Layout><SwitchSemester/></Layout></ProtectedRoute>}/>
      <Route path="*"                element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </BrowserRouter>
  )
}