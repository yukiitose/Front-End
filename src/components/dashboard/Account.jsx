import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Account() {
  const { user } = useAuth()

  return (
    <div style={{padding:'20px',background:'#f3f3f3',minHeight:'100vh'}}>
      <style>{`
        .account-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f5f5f5; }
        @media (max-width: 480px) {
          .profile-header { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div style={{marginBottom:20}}>
        <h2 style={{color:'#B71C1C',fontSize:20,fontWeight:800,margin:'0 0 4px'}}>My Account</h2>
        <p style={{color:'#888',fontSize:13,margin:0}}>Your personal profile information</p>
      </div>

      <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:24,boxShadow:'0 2px 8px rgba(0,0,0,0.05)',marginBottom:16}}>
        <div className="profile-header">
          <div style={{width:80,height:80,borderRadius:'50%',background:'#B71C1C',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(183,28,28,0.3)',flexShrink:0}}>
            <span style={{color:'#fff',fontWeight:900,fontSize:32}}>{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <div style={{color:'#B71C1C',fontWeight:800,fontSize:20}}>{user?.name}</div>
            <div style={{color:'#888',fontSize:14,marginTop:4}}>{user?.email}</div>
            <div style={{display:'inline-block',background:'#fef2f2',color:'#B71C1C',fontSize:12,fontWeight:700,padding:'4px 12px',borderRadius:20,marginTop:8,border:'1px solid #fecaca'}}>
              Active User
            </div>
          </div>
        </div>

        {[
          {icon:'👤', label:'Full Name',    value: user?.name},
          {icon:'📧', label:'Email',        value: user?.email},
          {icon:'🏫', label:'Campus',       value: 'Tagum Campus'},
          {icon:'📅', label:'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'}) : '—'},
          {icon:'✅', label:'Status',       value: 'Active', highlight: true},
        ].map((row,i,arr) => (
          <div key={i} style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:8,padding:'14px 0',borderBottom:i<arr.length-1?'1px solid #f5f5f5':'none'}}>
            <span style={{color:'#888',fontSize:13,fontWeight:600,minWidth:140}}>{row.icon} {row.label}</span>
            <span style={{color:row.highlight?'#2e7d32':'#333',fontSize:14,fontWeight:row.highlight?700:500}}>{row.value||'—'}</span>
          </div>
        ))}
      </div>

      <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'flex-start',gap:12}}>
        <span style={{fontSize:20,flexShrink:0}}>ℹ️</span>
        <p style={{color:'#991b1b',fontSize:13,margin:0,lineHeight:1.6}}>
          To update your profile information, please contact the UM Tagum College registrar's office.
        </p>
      </div>
    </div>
  )
}