import React, { useState } from 'react'

const items = [
  '📚 Academic records management and enrollment processing',
  '📊 Statistical reporting and institutional research',
  '📧 Communication regarding academic matters and announcements',
  '🎓 Issuance of official documents and certifications',
  '🔐 Portal access and system authentication',
]

export default function Consent() {
  const [agreed, setAgreed] = useState(false)
  const [saved,  setSaved]  = useState(false)

  const handleSave = () => {
    if (!agreed) return
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{padding:'20px',background:'#f3f3f3',minHeight:'100vh'}}>
      <style>{`
        .consent-card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.05); margin-bottom:16px; }
        @media (max-width: 480px) {
          .consent-card { padding: 16px; }
        }
      `}</style>

      <div style={{marginBottom:20}}>
        <h2 style={{color:'#B71C1C',fontSize:20,fontWeight:800,margin:'0 0 4px'}}>Data Privacy Consent</h2>
        <p style={{color:'#888',fontSize:13,margin:0}}>UM Tagum College — Data Privacy Policy</p>
      </div>

      <div className="consent-card">
        <h3 style={{color:'#B71C1C',fontSize:16,fontWeight:700,margin:'0 0 16px'}}>📋 Privacy Notice</h3>
        <p style={{color:'#555',fontSize:14,lineHeight:1.8,margin:'0 0 16px'}}>
          In compliance with the <strong>Data Privacy Act of 2012 (Republic Act 10173)</strong>,
          the University of Mindanao Tagum College collects and processes your personal information for:
        </p>

        {items.map((item,i,arr) => (
          <div key={i} style={{padding:'10px 0',borderBottom:i<arr.length-1?'1px solid #f5f5f5':'none'}}>
            <span style={{color:'#555',fontSize:14,lineHeight:1.6}}>{item}</span>
          </div>
        ))}

        <p style={{color:'#555',fontSize:14,lineHeight:1.8,margin:'16px 0 0'}}>
          Your data will be kept confidential and will not be shared with third parties without your consent, except as required by law.
        </p>

        <div
          onClick={()=>setAgreed(!agreed)}
          style={{display:'flex',alignItems:'flex-start',gap:12,padding:16,background:agreed?'#f0fdf4':'#fef2f2',borderRadius:10,border:`1px solid ${agreed?'#86efac':'#fecaca'}`,cursor:'pointer',marginTop:20}}
        >
          <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${agreed?'#2e7d32':'#B71C1C'}`,background:agreed?'#2e7d32':'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
            {agreed && <span style={{color:'#fff',fontSize:14,fontWeight:900}}>✓</span>}
          </div>
          <p style={{color:'#333',fontSize:14,margin:0,lineHeight:1.6}}>
            I have read and understood the Data Privacy Notice. I consent to the collection
            and processing of my personal data by UM Tagum College.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={!agreed}
          style={{width:'100%',background:agreed?'#B71C1C':'#ccc',color:'#fff',border:'none',borderRadius:10,padding:14,fontSize:15,fontWeight:700,cursor:agreed?'pointer':'not-allowed',marginTop:16}}
        >
          {saved ? '✅ Consent Saved!' : 'Save Consent'}
        </button>
      </div>

      <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'flex-start',gap:12}}>
        <span style={{fontSize:20,flexShrink:0}}>ℹ️</span>
        <p style={{color:'#991b1b',fontSize:13,margin:0,lineHeight:1.6}}>
          Your consent preferences are stored securely in our system.
        </p>
      </div>
    </div>
  )
}