import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function CreatePassword() {
  const navigate                = useNavigate()
  const [form, setForm]         = useState({ email: '', access_code: '', password: '', password_confirmation: '' })
  const [showPass, setShowPass] = useState(false)
  const [message,  setMessage]  = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.access_code || !form.password || !form.password_confirmation) { setError('Please fill in all fields.'); return }
    if (form.password !== form.password_confirmation) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true); setError('')
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/create-password', form,
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
      )
      setMessage(res.data.message)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid access code or email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:12,padding:'48px 40px',width:'100%',maxWidth:440,boxShadow:'0 4px 24px rgba(0,0,0,0.10)'}}>

        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{width:60,height:60,borderRadius:'50%',border:'3px solid #fff',overflow:'hidden',margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="/um-logo.png" alt="UM" style={{width:'100%'}} onError={e=>{e.target.style.display='none'}}/>
          </div>
          <h2 style={{color:'#B71C1C',fontWeight:800,fontSize:22,margin:0}}>Create Password</h2>
          <p style={{color:'#888',fontSize:13,margin:'6px 0 0'}}>UM Tagum Portal — Tagum Campus</p>
        </div>

        {message ? (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:48,marginBottom:12}}>✅</div>
            <h3 style={{color:'#2e7d32',fontWeight:700,margin:'0 0 8px'}}>Password Created!</h3>
            <p style={{color:'#555',fontSize:14}}>{message}</p>
            <p style={{color:'#888',fontSize:13,marginTop:8}}>Redirecting to login in 3 seconds...</p>
          </div>
        ) : (
          <>
            {error && <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#991b1b',borderRadius:8,padding:'10px 14px',fontSize:13,marginBottom:16}}>{error}</div>}

            <p style={{color:'#555',fontSize:13,marginBottom:20,lineHeight:1.6,background:'#fef2f2',padding:'12px 16px',borderRadius:8,borderLeft:'4px solid #B71C1C'}}>
              Enter the access code you received via SMS or from the admission officer.
            </p>

            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                placeholder="Email Address"
                style={{border:'1px solid #ddd',borderRadius:6,padding:'14px 16px',fontSize:14,color:'#333',outline:'none'}}/>

              <input type="text" value={form.access_code} onChange={e=>setForm({...form,access_code:e.target.value})}
                placeholder="Access Code"
                style={{border:'1px solid #ddd',borderRadius:6,padding:'14px 16px',fontSize:14,color:'#333',outline:'none',letterSpacing:'2px',fontWeight:700}}/>

              <div style={{position:'relative'}}>
                <input type={showPass?'text':'password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
                  placeholder="New Password (min 8 characters)"
                  style={{width:'100%',border:'1px solid #ddd',borderRadius:6,padding:'14px 48px 14px 16px',fontSize:14,color:'#333',outline:'none',boxSizing:'border-box'}}/>
                <button type="button" onClick={()=>setShowPass(!showPass)}
                  style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#999',fontSize:14,fontWeight:600}}>
                  {showPass?'Hide':'Show'}
                </button>
              </div>

              <input type={showPass?'text':'password'} value={form.password_confirmation} onChange={e=>setForm({...form,password_confirmation:e.target.value})}
                placeholder="Confirm Password"
                style={{border:'1px solid #ddd',borderRadius:6,padding:'14px 16px',fontSize:14,color:'#333',outline:'none'}}/>

              <button type="submit" disabled={loading}
                style={{background:'#B71C1C',color:'#fff',border:'none',borderRadius:6,padding:15,fontSize:15,fontWeight:700,cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1}}>
                {loading?'Creating...':'Create Password →'}
              </button>
            </form>

            <div style={{textAlign:'center',marginTop:20}}>
              <Link to="/login" style={{color:'#B71C1C',fontWeight:600,fontSize:14,textDecoration:'none'}}>← Back to Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}