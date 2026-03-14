import React from 'react'
import {
  PieChart, Pie, Cell, Legend,
  Tooltip, ResponsiveContainer
} from 'recharts'

const COLORS = ['#B71C1C','#E53935','#EF9A9A','#C62828','#D32F2F','#E57373','#7f0000','#FF5252']
const TT = { contentStyle:{background:'#fff',border:'1px solid #ddd',borderRadius:8,color:'#333'} }

export default function CourseDistributionChart({ data }) {
  return (
    <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:24,boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
      <h3 style={{color:'#B71C1C',fontSize:15,fontWeight:700,margin:'0 0 20px'}}>
        🍩 Students by Course
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data.slice(0,8)}
            dataKey="count"
            nameKey="course"
            cx="50%" cy="50%"
            outerRadius={90}
            innerRadius={45}
          >
            {data.slice(0,8).map((_,i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]}/>
            ))}
          </Pie>
          <Tooltip {...TT}/>
          <Legend formatter={v=><span style={{color:'#555',fontSize:11}}>{v}</span>}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}