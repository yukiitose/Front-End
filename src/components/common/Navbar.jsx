import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const links = [
  { to: '/dashboard', label: '📊 Dashboard' },
  { to: '/students',  label: '👥 Students'  },
  { to: '/courses',   label: '📚 Courses'   },
  { to: '/weather',   label: '🌤 Weather'   },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const location         = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav style={{background:'#8B1A1A',borderBottom:'1px solid rgba(0,0,0,0.15)',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',height:64,gap:24}}>

        <Link to="/dashboard" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',marginRight:16}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#8B1A1A',fontWeight:800,fontSize:16}}>U</span>
          </div>
          <span style={{color:'#fff',fontWeight:700,fontSize:18}}>UM Tagum</span>
        </Link>

        <div style={{display:'flex',gap:4,flex:1}}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: location.pathname === l.to ? 700 : 500,
                background: location.pathname === l.to ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderBottom: location.pathname === l.to ? '2px solid #fff' : '2px solid transparent',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <span style={{color:'rgba(255,255,255,0.85)',fontSize:13}}>👤 {user?.name}</span>
        <button
          onClick={handleLogout}
          style={{background:'#fff',border:'none',color:'#8B1A1A',borderRadius:8,padding:'6px 16px',fontSize:13,cursor:'pointer',fontWeight:700}}
        >
          Logout
        </button>

      </div>
    </nav>
  )
}