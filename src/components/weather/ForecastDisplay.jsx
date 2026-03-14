import React from 'react'
import { getWeatherIconUrl } from '../../services/weatherApi.js'

export default function ForecastDisplay({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div>
      <h4 style={{color:'rgba(255,255,255,0.8)',fontSize:13,fontWeight:600,textTransform:'uppercase',letterSpacing:'1px',marginBottom:16}}>
        5-Day Forecast
      </h4>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:12}}>
        {forecast.map((day, i) => (
          <div key={i} style={{background:'rgba(255,255,255,0.15)',borderRadius:14,padding:'16px 12px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
            <div style={{color:'#fff',fontSize:12,fontWeight:600}}>
              {i === 0 ? 'Today' : new Date(day.dt_txt).toLocaleDateString('en-PH',{weekday:'short',month:'short',day:'numeric'})}
            </div>
            <img src={getWeatherIconUrl(day.weather[0].icon)} alt="" style={{width:48,height:48}}/>
            <div style={{color:'#fff',fontSize:14,fontWeight:700}}>
              {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
            </div>
            <div style={{color:'rgba(255,255,255,0.7)',fontSize:11}}>{day.weather[0].main}</div>
          </div>
        ))}
      </div>
    </div>
  )
}