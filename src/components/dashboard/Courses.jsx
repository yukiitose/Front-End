import React, { useEffect, useState } from 'react'
import { getCourses } from '../../services/api.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'

const SCHED = {
  MWF:    {bg:'#fef2f2', text:'#991b1b'},
  TTH:    {bg:'#fff7ed', text:'#9a3412'},
  SAT:    {bg:'#fdf2f8', text:'#8B1A1A'},
  ONLINE: {bg:'#f3f4f6', text:'#555'},
}
const DEPTS = ['All','College of Information Technology','College of Engineering','College of Business','College of Education','College of Arts & Sciences','College of Nursing','College of Criminology']

export default function Courses() {
  const [courses,setCourses] = useState([])
  const [loading,setLoading] = useState(true)
  const [filter,setFilter]   = useState('All')

  useEffect(()=>{
    setLoading(true)
    const params = filter!=='All' ? {department:filter} : {}
    getCourses(params).then(r=>setCourses(r.data)).catch(console.error).finally(()=>setLoading(false))
  },[filter])

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'32px 24px',background:'#f3f3f3',minHeight:'100vh'}}>
      <div style={{marginBottom:24}}>
        <h2 style={{color:'#8B1A1A',fontSize:26,fontWeight:800,margin:0}}>📚 Courses</h2>
        <p style={{color:'#666',fontSize:14,margin:'4px 0 0'}}>{courses.length} courses available</p>
      </div>

      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:24}}>
        {DEPTS.map(d=>(
          <button key={d} onClick={()=>setFilter(d)} style={{
            background: filter===d ? '#8B1A1A' : '#fff',
            border:     `1px solid ${filter===d ? '#8B1A1A' : '#ddd'}`,
            color:      filter===d ? '#fff' : '#555',
            borderRadius:8, padding:'7px 14px', cursor:'pointer', fontSize:13,
            fontWeight: filter===d ? 700 : 400,
          }}>
            {d==='All' ? d : d.replace('College of ','')}
          </button>
        ))}
      </div>

      {loading ? <LoadingSpinner message="Loading courses..."/> : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {courses.length===0 && <p style={{color:'#999',gridColumn:'1/-1',textAlign:'center',padding:40}}>No courses found.</p>}
          {courses.map(c=>{
            const pct=Math.round((c.enrolled/c.capacity)*100)
            const sc=SCHED[c.schedule]||SCHED.MWF
            return (
              <div key={c.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:20,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                  <code style={{background:'#fef2f2',color:'#8B1A1A',borderRadius:4,padding:'3px 8px',fontFamily:'monospace',fontSize:13,fontWeight:700}}>{c.course_code}</code>
                  <span style={{background:sc.bg,color:sc.text,borderRadius:6,padding:'3px 10px',fontSize:11,fontWeight:600,border:`1px solid ${sc.text}`}}>{c.schedule}</span>
                </div>
                <h4 style={{color:'#1a1a1a',fontSize:15,fontWeight:700,margin:'0 0 4px',lineHeight:1.4}}>{c.course_name}</h4>
                <p style={{color:'#888',fontSize:12,margin:'0 0 12px'}}>{c.department.replace('College of ','')}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:10,color:'#666',fontSize:12,marginBottom:14}}>
                  <span>👩‍🏫 {c.instructor}</span><span>📋 {c.units} units</span>{c.room&&<span>🏫 {c.room}</span>}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{color:'#888',fontSize:12}}>Enrollment</span>
                  <span style={{color:'#333',fontSize:12,fontWeight:600}}>{c.enrolled}/{c.capacity}</span>
                </div>
                <div style={{background:'#f3f4f6',borderRadius:4,height:6,overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:4,width:`${pct}%`,background:pct>=90?'#C0392B':pct>=70?'#E74C3C':'#8B1A1A'}}/>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}