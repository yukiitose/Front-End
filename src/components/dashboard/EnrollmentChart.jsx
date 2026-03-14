import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const TT = { contentStyle:{background:'#fff',border:'1px solid #ddd',borderRadius:8,color:'#333'} }

export default function EnrollmentChart({ data }) {
  return (
    <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:24,boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
      <h3 style={{color:'#B71C1C',fontSize:15,fontWeight:700,margin:'0 0 20px'}}>
        📈 Monthly Enrollment (2024)
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{top:5,right:10,left:-20,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5"/>
          <XAxis dataKey="month" tick={{fill:'#888',fontSize:11}}/>
          <YAxis tick={{fill:'#888',fontSize:11}}/>
          <Tooltip {...TT}/>
          <Bar dataKey="count" fill="#B71C1C" radius={[6,6,0,0]} name="Enrolled"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}