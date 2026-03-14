import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [form, setForm]       = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/self-register`, form)
      setSuccess(true)
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width:'100%',padding:'13px 16px',border:'1.5px solid #e5e7eb',
    borderRadius:10,fontSize:15,outline:'none',boxSizing:'border-box',
    fontFamily:'inherit',color:'#333',background:'#fff'
  }

  if (success) return (
    <div style={{minHeight:'100vh',background:'#f3f3f3',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div style={{background:'#fff',borderRadius:20,padding:'48px 36px',maxWidth:420,width:'100%',textAlign:'center',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{fontSize:64,marginBottom:16}}>📧</div>
        <h2 style={{color:'#2e7d32',fontSize:22,fontWeight:800,margin:'0 0 12px'}}>Check Your Email!</h2>
        <p style={{color:'#555',fontSize:14,lineHeight:1.7,margin:'0 0 24px'}}>
          We sent a <strong>6-digit access code</strong> to <strong>{form.email}</strong>.<br/>
          Use it to create your password.
        </p>
        <Link to="/create-password" style={{display:'inline-block',background:'#B71C1C',color:'#fff',textDecoration:'none',padding:'13px 32px',borderRadius:10,fontWeight:700,fontSize:15}}>
          Create Password →
        </Link>
        <div style={{marginTop:16}}>
          <Link to="/login" style={{color:'#B71C1C',fontSize:14,textDecoration:'none',fontWeight:600}}>← Back to Login</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#f3f3f3',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div style={{background:'#fff',borderRadius:20,padding:'48px 36px',maxWidth:420,width:'100%',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>

        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{width:80,height:80,borderRadius:'50%',border:'3px solid #fff',overflow:'hidden',margin:'0 auto 16px',boxShadow:'0 4px 16px rgba(183,28,28,0.2)'}}>
            <img src="/um-logo.png" alt="UM" style={{width:'100%',height:'100%',objectFit:'cover'}}
              onError={e=>e.target.style.display='none'}/>
          </div>
          <h1 style={{color:'#B71C1C',fontSize:26,fontWeight:900,margin:'0 0 4px'}}>Create Account</h1>
          <p style={{color:'#888',fontSize:13,margin:0}}>UM Tagum Portal — Tagum Campus</p>
        </div>

        {error && (
          <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#991b1b',borderRadius:10,padding:'12px 16px',fontSize:14,marginBottom:20}}>
            {error}
          </div>
        )}

        <div style={{marginBottom:16}}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e=>setForm({...form,name:e.target.value})}
            onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
          />
        </div>

        <div style={{marginBottom:24}}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e=>setForm({...form,email:e.target.value})}
            onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{width:'100%',background:loading?'#ccc':'#B71C1C',color:'#fff',border:'none',borderRadius:10,padding:'14px',fontSize:16,fontWeight:700,cursor:loading?'not-allowed':'pointer',marginBottom:20,transition:'background 0.2s'}}
        >
          {loading ? 'Sending...' : 'Register & Get Access Code →'}
        </button>

        <div style={{textAlign:'center',fontSize:14,color:'#888',marginBottom:8}}>
          Already have an account?{' '}
          <Link to="/login" style={{color:'#B71C1C',fontWeight:700,textDecoration:'none'}}>Login</Link>
        </div>
        <div style={{textAlign:'center',fontSize:14}}>
          <Link to="/create-password" style={{color:'#B71C1C',fontWeight:600,textDecoration:'none'}}>Already have an access code?</Link>
        </div>

      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 480px) {
          div[style*="padding: 48px"] {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </div>
  )
}