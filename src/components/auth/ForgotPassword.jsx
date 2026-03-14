import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email.'); return }
    setLoading(true); setError('')
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email },
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
      )
      setMessage(res.data.message)
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:12,padding:'48px 40px',width:'100%',maxWidth:420,boxShadow:'0 4px 24px rgba(0,0,0,0.10)'}}>

        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{width:60,height:60,borderRadius:'50%',border:'3px solid #fff',overflow:'hidden',margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="/um-logo.png" alt="UM" style={{width:'100%'}} onError={e=>{e.target.style.display='none'}}/>
          </div>
          <h2 style={{color:'#B71C1C',fontWeight:800,fontSize:22,margin:0}}>Forgot Password</h2>
          <p style={{color:'#888',fontSize:13,margin:'6px 0 0'}}>UM Tagum Portal — Tagum Campus</p>
        </div>

        {sent ? (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:48,marginBottom:12}}>📧</div>
            <h3 style={{color:'#2e7d32',fontWeight:700,margin:'0 0 8px'}}>Email Sent!</h3>
            <p style={{color:'#555',fontSize:14,lineHeight:1.6}}>{message}</p>
            <p style={{color:'#888',fontSize:13,marginTop:12}}>Check your inbox and click the reset link.</p>
            <Link to="/login" style={{display:'inline-block',marginTop:20,color:'#B71C1C',fontWeight:700,fontSize:14}}>← Back to Login</Link>
          </div>
        ) : (
          <>
            {error   && <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#991b1b',borderRadius:8,padding:'10px 14px',fontSize:13,marginBottom:16}}>{error}</div>}
            {message && <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#166534',borderRadius:8,padding:'10px 14px',fontSize:13,marginBottom:16}}>{message}</div>}

            <p style={{color:'#555',fontSize:14,marginBottom:20,lineHeight:1.6}}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
              <input
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{border:'1px solid #ddd',borderRadius:6,padding:'14px 16px',fontSize:14,color:'#333',outline:'none'}}
              />
              <button type="submit" disabled={loading}
                style={{background:'#B71C1C',color:'#fff',border:'none',borderRadius:6,padding:15,fontSize:15,fontWeight:700,cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1}}>
                {loading ? 'Sending...' : 'Send Reset Link →'}
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