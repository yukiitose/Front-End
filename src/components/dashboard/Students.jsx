import React, { useEffect, useState } from 'react'
import { getStudents } from '../../services/api.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'

const STATUS = {
  Active:    {bg:'#fef2f2',  text:'#991b1b'},
  Inactive:  {bg:'#f3f4f6',  text:'#6b7280'},
  Graduated: {bg:'#fff7ed',  text:'#9a3412'},
}

export default function Students() {
  const [students,setStudents]       = useState([])
  const [meta,setMeta]               = useState({})
  const [loading,setLoading]         = useState(true)
  const [search,setSearch]           = useState('')
  const [searchInput,setSearchInput] = useState('')
  const [page,setPage]               = useState(1)

  useEffect(()=>{
    setLoading(true)
    getStudents({page,search})
      .then(r=>{ setStudents(r.data.data); setMeta({total:r.data.total,current_page:r.data.current_page,last_page:r.data.last_page}) })
      .catch(console.error)
      .finally(()=>setLoading(false))
  },[page,search])

  const handleSearch = e => { e.preventDefault(); setPage(1); setSearch(searchInput) }

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'32px 24px',background:'#f3f3f3',minHeight:'100vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:16,marginBottom:28}}>
        <div>
          <h2 style={{color:'#8B1A1A',fontSize:26,fontWeight:800,margin:0}}>👥 Students</h2>
          <p style={{color:'#666',fontSize:14,margin:'4px 0 0'}}>{meta.total?.toLocaleString()} total students</p>
        </div>
        <form onSubmit={handleSearch} style={{display:'flex',gap:8}}>
          <input value={searchInput} onChange={e=>setSearchInput(e.target.value)} placeholder="Search name, ID, email..."
            style={{background:'#fff',border:'1px solid #ddd',borderRadius:8,padding:'10px 16px',color:'#333',fontSize:14,width:260,outline:'none'}}/>
          <button type="submit" style={{background:'#8B1A1A',color:'#fff',border:'none',borderRadius:8,padding:'10px 18px',cursor:'pointer',fontSize:14,fontWeight:600}}>Search</button>
          {search && <button type="button" onClick={()=>{setSearchInput('');setSearch('');setPage(1)}} style={{background:'#fff',border:'1px solid #ddd',color:'#666',borderRadius:8,padding:'10px 14px',cursor:'pointer',fontSize:13}}>Clear</button>}
        </form>
      </div>

      {loading ? <LoadingSpinner message="Loading students..."/> : (
        <>
          <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,overflow:'auto',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#8B1A1A'}}>
                  {['Student ID','Name','Email','Course','Department','Year','Status'].map(h=>(
                    <th key={h} style={{color:'#fff',fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',padding:'14px 16px',textAlign:'left',whiteSpace:'nowrap'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.length===0 && <tr><td colSpan={7} style={{color:'#999',textAlign:'center',padding:40,fontSize:14}}>No students found.</td></tr>}
                {students.map((s,i)=>(
                  <tr key={s.id} style={{borderBottom:'1px solid #f0f0f0',background:i%2===0?'#fff':'#fafafa'}}>
                    <td style={{padding:'12px 16px'}}><code style={{background:'#fef2f2',color:'#8B1A1A',borderRadius:4,padding:'2px 6px',fontFamily:'monospace',fontSize:12,fontWeight:700}}>{s.student_id}</code></td>
                    <td style={{color:'#333',fontSize:13,padding:'12px 16px',fontWeight:500}}>{s.first_name} {s.last_name}</td>
                    <td style={{color:'#888',fontSize:12,padding:'12px 16px'}}>{s.email}</td>
                    <td style={{color:'#333',fontSize:13,padding:'12px 16px'}}>{s.course}</td>
                    <td style={{padding:'12px 16px'}}><span style={{background:'#f3f4f6',color:'#555',borderRadius:4,padding:'2px 8px',fontSize:11}}>{s.department.replace('College of ','')}</span></td>
                    <td style={{color:'#555',fontSize:13,padding:'12px 16px'}}>Year {s.year_level}</td>
                    <td style={{padding:'12px 16px'}}><span style={{background:STATUS[s.enrollment_status]?.bg,color:STATUS[s.enrollment_status]?.text,borderRadius:6,padding:'3px 10px',fontSize:12,fontWeight:600,border:`1px solid ${STATUS[s.enrollment_status]?.text}`}}>{s.enrollment_status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:16,marginTop:24}}>
            <button disabled={page<=1} onClick={()=>setPage(page-1)} style={{background:'#fff',border:'1px solid #ddd',color:'#8B1A1A',borderRadius:8,padding:'8px 16px',cursor:page<=1?'not-allowed':'pointer',fontSize:13,fontWeight:600,opacity:page<=1?0.4:1}}>← Prev</button>
            <span style={{color:'#555',fontSize:14}}>Page {meta.current_page} of {meta.last_page}</span>
            <button disabled={page>=meta.last_page} onClick={()=>setPage(page+1)} style={{background:'#fff',border:'1px solid #ddd',color:'#8B1A1A',borderRadius:8,padding:'8px 16px',cursor:page>=meta.last_page?'not-allowed':'pointer',fontSize:13,fontWeight:600,opacity:page>=meta.last_page?0.4:1}}>Next →</button>
          </div>
        </>
      )}
    </div>
  )
}