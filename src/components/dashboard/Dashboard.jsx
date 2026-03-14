import React, { useEffect, useState } from 'react'
import { getDashboard } from '../../services/api.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'
import EnrollmentChart from './EnrollmentChart.jsx'
import CourseDistributionChart from './CourseDistributionChart.jsx'
import AttendanceChart from './AttendanceChart.jsx'

const card = {
  background:'#fff',
  border:'1px solid #e5e7eb',
  borderRadius:12,
  padding:24,
  boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{...card,borderLeft:`4px solid ${color}`,display:'flex',alignItems:'center',gap:20,padding:'20px 24px'}}>
      <div style={{width:52,height:52,borderRadius:12,background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <span style={{fontSize:26}}>{icon}</span>
      </div>
      <div>
        <div style={{color,fontSize:32,fontWeight:800,lineHeight:1}}>{value?.toLocaleString()}</div>
        <div style={{color:'#888',fontSize:13,marginTop:4,fontWeight:500}}>{label}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [data,setData]       = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError]     = useState('')

  useEffect(()=>{
    getDashboard()
      .then(r=>setData(r.data))
      .catch(()=>setError('Failed to load dashboard. Make sure Laravel server is running.'))
      .finally(()=>setLoading(false))
  },[])

  if(loading) return <LoadingSpinner message="Loading dashboard..."/>
  if(error) return (
    <div style={{margin:32,background:'#fef2f2',border:'1px solid #fecaca',color:'#991b1b',borderRadius:12,padding:24,fontSize:15}}>
      ⚠️ {error}
    </div>
  )
  if(!data) return null

  const {students,courses,enrollment_trend,course_distribution,attendance,recent_events} = data

  return (
    <div style={{padding:'28px',background:'#f3f3f3',minHeight:'100vh'}}>

      {/* Stat Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginBottom:24}}>
        <StatCard icon="👥" label="Total Students"  value={students.total}     color="#B71C1C"/>
        <StatCard icon="✅" label="Active Students" value={students.active}    color="#2e7d32"/>
        <StatCard icon="📚" label="Total Courses"   value={courses.total}      color="#1565c0"/>
        <StatCard icon="🎓" label="Graduated"       value={students.graduated} color="#6a1b9a"/>
      </div>

      {/* Bar + Pie Charts */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(360px,1fr))',gap:16,marginBottom:16}}>
        <EnrollmentChart data={enrollment_trend}/>
        <CourseDistributionChart data={course_distribution}/>
      </div>

      {/* Line Chart */}
      <div style={{marginBottom:16}}>
        <AttendanceChart data={attendance}/>
      </div>

      {/* Recent Events */}
      <div style={card}>
        <h3 style={{color:'#B71C1C',fontSize:15,fontWeight:700,margin:'0 0 20px'}}>
          📌 Recent School Events
        </h3>
        {recent_events.length===0 && (
          <p style={{color:'#aaa',fontSize:14,textAlign:'center',padding:20}}>No recent events.</p>
        )}
        {recent_events.map((ev,i)=>(
          <div key={ev.id} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:i<recent_events.length-1?'1px solid #f5f5f5':'none'}}>
            <span style={{
              background: ev.type==='Holiday'?'#fef2f2':ev.type==='Exam'?'#fff3e0':'#e3f2fd',
              color:      ev.type==='Holiday'?'#B71C1C':ev.type==='Exam'?'#e65100':'#1565c0',
              borderRadius:6,padding:'4px 12px',fontSize:12,fontWeight:700,
              minWidth:80,textAlign:'center',border:'1px solid currentColor',flexShrink:0
            }}>{ev.type}</span>
            <span style={{color:'#333',fontSize:14,flex:1,fontWeight:500}}>{ev.title}</span>
            <span style={{color:'#aaa',fontSize:13,flexShrink:0}}>
              {new Date(ev.date).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}