import React, { useState } from 'react'

const semesters = [
  { id:1, label:'1st Semester', year:'2025-2026', status:'current'   },
  { id:2, label:'2nd Semester', year:'2025-2026', status:'upcoming'  },
  { id:3, label:'1st Semester', year:'2024-2025', status:'completed' },
  { id:4, label:'2nd Semester', year:'2024-2025', status:'completed' },
  { id:5, label:'1st Semester', year:'2023-2024', status:'completed' },
]

const getStatusStyle = (status) => {
  if (status === 'current')  return { bg:'#fef2f2', color:'#B71C1C', border:'#fecaca', label:'Current'   }
  if (status === 'upcoming') return { bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe', label:'Upcoming'  }
  return                            { bg:'#f0fdf4', color:'#2e7d32', border:'#86efac', label:'Completed' }
}

export default function SwitchSemester() {
  const [selected, setSelected] = useState(1)
  const current = semesters.find(s => s.id === selected)

  return (
    <div style={{padding:'20px',background:'#f3f3f3',minHeight:'100vh'}}>
      <style>{`
        .sem-item { display:flex; align-items:center; justify-content:space-between; padding:18px 20px; cursor:pointer; transition:background 0.2s; }
        .sem-item:hover { background: #fafafa; }
        .sem-right { display:flex; align-items:center; gap:10px; }
        @media (max-width: 480px) {
          .sem-item { flex-direction:column; align-items:flex-start; gap:10px; }
          .sem-right { width:100%; justify-content:space-between; }
        }
      `}</style>

      <div style={{marginBottom:20}}>
        <h2 style={{color:'#B71C1C',fontSize:20,fontWeight:800,margin:'0 0 4px'}}>Switch Semester</h2>
        <p style={{color:'#888',fontSize:13,margin:0}}>Select the academic semester to view</p>
      </div>

      {/* Current Selected Banner */}
      <div style={{background:'#B71C1C',borderRadius:12,padding:'20px 24px',marginBottom:20,boxShadow:'0 4px 16px rgba(183,28,28,0.3)'}}>
        <div style={{color:'rgba(255,255,255,0.8)',fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'1px',marginBottom:4}}>
          Currently Viewing
        </div>
        <div style={{color:'#fff',fontSize:18,fontWeight:800}}>
          {current?.label} — {current?.year}
        </div>
      </div>

      {/* Semester List */}
      <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.05)',marginBottom:16}}>
        {semesters.map((sem,i) => {
          const style    = getStatusStyle(sem.status)
          const isActive = selected === sem.id
          return (
            <div
              key={sem.id}
              className="sem-item"
              onClick={()=>setSelected(sem.id)}
              style={{
                background: isActive?'#fef2f2':'#fff',
                borderBottom: i<semesters.length-1?'1px solid #f5f5f5':'none',
              }}
            >
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:42,height:42,borderRadius:10,background:isActive?'#B71C1C':'#f3f3f3',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span style={{fontSize:20}}>📅</span>
                </div>
                <div>
                  <div style={{color:isActive?'#B71C1C':'#333',fontWeight:700,fontSize:15}}>{sem.label}</div>
                  <div style={{color:'#888',fontSize:13,marginTop:2}}>A.Y. {sem.year}</div>
                </div>
              </div>
              <div className="sem-right">
                <span style={{background:style.bg,color:style.color,border:`1px solid ${style.border}`,borderRadius:20,padding:'4px 12px',fontSize:12,fontWeight:700}}>
                  {style.label}
                </span>
                {isActive && <span style={{color:'#B71C1C',fontSize:20,fontWeight:900}}>✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'flex-start',gap:12}}>
        <span style={{fontSize:20,flexShrink:0}}>ℹ️</span>
        <p style={{color:'#991b1b',fontSize:13,margin:0,lineHeight:1.6}}>
          Switching semesters updates the dashboard data to reflect the selected academic period.
        </p>
      </div>
    </div>
  )
}