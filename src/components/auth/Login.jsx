import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'


export default function Login() {
  const { login }             = useAuth()
  const navigate              = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'#f0f0f0'}}>

      {/* Left Side */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 80px'}}>
        <h1 style={{fontSize:36,fontWeight:800,color:'#1a1a1a',margin:'0 0 4px'}}>
          Welcome to <span style={{color:'#B71C1C'}}>UM</span>
        </h1>
        <p style={{color:'#555',fontSize:16,margin:'0 0 40px',fontStyle:'italic'}}>The first in leadership education</p>

        <div style={{marginBottom:28}}>
          <p style={{margin:'0 0 8px'}}>
            <span style={{color:'#B71C1C',fontWeight:700,fontSize:14}}>For New Student Registration </span>
            <span style={{color:'#B71C1C',fontSize:14,textDecoration:'underline',cursor:'pointer'}}>click here</span>
          </p>
          <p style={{color:'#444',fontSize:13,lineHeight:1.8,maxWidth:500,textIndent:24}}>
            Hi, Ga! Registering with UM opens the doors to globally recognized quality, affordable, and open education; and where we aim to develop diamonds in the rough.
          </p>
          <p style={{color:'#444',fontSize:13,marginTop:8,textIndent:24}}>See you at UM!</p>
        </div>

        <div>
          <p style={{margin:'0 0 8px'}}>
            <span style={{color:'#B71C1C',fontWeight:700,fontSize:14}}>Connect To </span>
            <span style={{color:'#B71C1C',fontWeight:800,fontSize:14}}>UM Alumni - Tagum Campus </span>
            <span style={{color:'#B71C1C',fontSize:14,textDecoration:'underline',cursor:'pointer'}}>click here</span>
          </p>
          <p style={{color:'#444',fontSize:13,lineHeight:1.8,maxWidth:500,textIndent:24}}>
            Greetings! We are conducting an Alumni Tracer Study to update our database which will subsequently be used to assess graduate employability and mobility towards improving the course offerings of your alma mater. Please complete this online survey to let us know how satisfied you are with your overall student experience at UM and update us with your current career and employment. All responses are recorded anonymously so feel free to provide honest feedback.
          </p>
          <p style={{color:'#444',fontSize:13,marginTop:8,textIndent:24}}>Thank you!!</p>
        </div>
      </div>

      {/* Right Side - Login Card */}
      <div style={{width:460,display:'flex',alignItems:'center',justifyContent:'center',padding:40}}>
        <div style={{background:'#fff',borderRadius:12,padding:'48px 40px',width:'100%',boxShadow:'0 4px 24px rgba(0,0,0,0.10)'}}>

          {/* Logo */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:28}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
              <img src="/um-logo.png" alt="UM Logo" style={{width:64,height:64,objectFit:'contain'}}
                onError={e=>{ e.target.style.display='none' }}
              />
              <div>
                <div style={{fontSize:22,fontWeight:800,lineHeight:1}}>
                  <span style={{color:'#B71C1C'}}>student</span>
                  <span style={{color:'#E65100'}}>portal</span>
                </div>
              </div>
            </div>
            <p style={{color:'#B71C1C',fontWeight:700,fontSize:17,margin:0}}>Tagum Campus</p>
          </div>

          {error && (
            <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#991b1b',borderRadius:8,padding:'10px 14px',fontSize:13,marginBottom:16}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:12}}>
            <input
              type="text"
              value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})}
              placeholder="Student ID Number or Email"
              style={{border:'1px solid #ddd',borderRadius:6,padding:'14px 16px',fontSize:14,color:'#333',outline:'none',background:'#fff',width:'100%',boxSizing:'border-box'}}
            />

            <div style={{position:'relative'}}>
              <input
                type={showPass?'text':'password'}
                value={form.password}
                onChange={e=>setForm({...form,password:e.target.value})}
                placeholder="Password"
                style={{border:'1px solid #ddd',borderRadius:6,padding:'14px 48px 14px 16px',fontSize:14,color:'#333',outline:'none',background:'#fff',width:'100%',boxSizing:'border-box'}}
              />
              <button type="button" onClick={()=>setShowPass(!showPass)}
                style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#999',fontSize:18}}>
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>

            <button type="submit" disabled={loading}
              style={{background:'#B71C1C',color:'#fff',border:'none',borderRadius:6,padding:'15px',fontSize:16,fontWeight:700,cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,marginTop:4,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
              {loading ? 'Logging in...' : <>Login <span>→</span></>}
            </button>
          </form>

          <div style={{textAlign:'center',marginTop:20,borderTop:'1px solid #f0f0f0',paddingTop:20}}>
            <p style={{color:'#666',fontSize:12,lineHeight:1.6,margin:'0 0 12px'}}>
              If you have received an access code sent via SMS or given to you by the admission officer, please
            </p>
            <Link to="/create-password" style={{background:'#B71C1C',color:'#fff',borderRadius:6,padding:'10px 16px',fontSize:12,fontWeight:600,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:6}}>
              🔗 click here to create your password   
            </Link>
            <br/>
            <div style={{textAlign:'center',marginTop:12,fontSize:14}}>
              <span style={{color:'#888'}}>New user? </span>
             <Link to="/register" style={{color:'#B71C1C',fontWeight:700,textDecoration:'none'}}>Create Account</Link>
            </div>
            <Link to="/forgot-password" style={{color:'#B71C1C',fontSize:13,fontWeight:600,textDecoration:'underline'}}>
              Forgot Your Password?
            </Link>
          </div>

         
        </div>
      </div>
    </div>
  )
}