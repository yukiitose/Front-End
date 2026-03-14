import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const TT = { contentStyle:{background:'#fff',border:'1px solid #ddd',borderRadius:8,color:'#333'} }

export default function AttendanceChart({ data }) {
  return (
    <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:24,boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
      <h3 style={{color:'#B71C1C',fontSize:15,fontWeight:700,margin:'0 0 20px'}}>
        📅 Attendance Patterns (Last 30 School Days)
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{top:5,right:20,left:-20,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5"/>
          <XAxis dataKey="date" tick={{fill:'#888',fontSize:11}} interval={4}/>
          <YAxis tick={{fill:'#888',fontSize:11}}/>
          <Tooltip {...TT}/>
          <Legend formatter={v=><span style={{color:'#555',fontSize:12}}>{v}</span>}/>
          <Line type="monotone" dataKey="present" stroke="#2e7d32" strokeWidth={2.5} dot={false} name="Present"/>
          <Line type="monotone" dataKey="absent"  stroke="#B71C1C" strokeWidth={2.5} dot={false} name="Absent"/>
          <Line type="monotone" dataKey="late"    stroke="#f57f17" strokeWidth={2.5} dot={false} name="Late"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}