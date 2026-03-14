import React from 'react'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 20px',gap:16}}>
      <div style={{width:40,height:40,border:'3px solid rgba(139,26,26,0.2)',borderTop:'3px solid #8B1A1A',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
      <p style={{color:'#8B1A1A',fontSize:14,margin:0,fontWeight:500}}>{message}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}