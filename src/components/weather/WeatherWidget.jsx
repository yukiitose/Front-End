import React, { useEffect, useState } from 'react'
import { 
  getCurrentWeather, 
  getForecast,
  getWeatherByCoords, 
  getForecastByCoords,
  getWeatherIconUrl,
  getDailyForecast 
} from '../../services/weatherApi.js'
import ForecastDisplay from './ForecastDisplay.jsx'
import LoadingSpinner from '../common/LoadingSpinner.jsx'

export default function WeatherWidget() {
  const [city,setCity]         = useState('Cotabato City')
  const [input,setInput]       = useState('')
  const [current,setCurrent]   = useState(null)
  const [forecast,setForecast] = useState([])
  const [loading,setLoading]   = useState(false)
  const [error,setError]       = useState('')
  const [geoLoading,setGeoLoading] = useState(false)

  const fetchWeather = async (c) => {
    setLoading(true); setError('')
    try {
      const [wx,fc] = await Promise.all([getCurrentWeather(c),getForecast(c)])
      setCurrent(wx); setForecast(getDailyForecast(fc.list))
    } catch(e) { setError(e.message||'Could not fetch weather.') }
    finally { setLoading(false) }
  }

  useEffect(()=>{ fetchWeather(city) },[city])

  const handleSearch = e => { e.preventDefault(); if(input.trim()){ setCity(input.trim()); setInput('') } }

  const handleGeo = () => {
    if(!navigator.geolocation){ setError('Geolocation not supported.'); return }
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async({coords})=>{
        try {
          const [wx,fc] = await Promise.all([getWeatherByCoords(coords.latitude,coords.longitude),getForecastByCoords(coords.latitude,coords.longitude)])
          setCurrent(wx); setCity(wx.name); setForecast(getDailyForecast(fc.list))
        } catch { setError('Could not get location weather.') }
        finally { setGeoLoading(false) }
      },
      ()=>{ setError('Location access denied.'); setGeoLoading(false) }
    )
  }

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:'32px 24px',background:'#f3f3f3',minHeight:'100vh'}}>
      <div style={{marginBottom:24}}>
        <h2 style={{color:'#8B1A1A',fontSize:26,fontWeight:800,margin:0}}>🌤 Weather</h2>
        <p style={{color:'#666',fontSize:14,margin:'4px 0 0'}}>Real-time weather via OpenWeatherMap</p>
      </div>

      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20}}>
        <form onSubmit={handleSearch} style={{display:'flex',gap:8,flex:1}}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter city name (e.g. Manila, Davao)..."
            style={{flex:1,background:'#fff',border:'1px solid #ddd',borderRadius:8,padding:'12px 16px',color:'#333',fontSize:14,minWidth:200,outline:'none'}}/>
          <button type="submit" style={{background:'#8B1A1A',color:'#fff',border:'none',borderRadius:8,padding:'12px 18px',cursor:'pointer',fontSize:14,fontWeight:600}}>🔍 Search</button>
        </form>
        <button onClick={handleGeo} disabled={geoLoading} style={{background:'#fff',border:'1px solid #8B1A1A',color:'#8B1A1A',borderRadius:8,padding:'12px 16px',cursor:'pointer',fontSize:14,fontWeight:600}}>
          {geoLoading?'Getting location...':'📍 My Location'}
        </button>
      </div>

      {error && (
        <div style={{background:'#fef2f2',border:'1px solid #fecaca',color:'#991b1b',borderRadius:10,padding:16,fontSize:14,marginBottom:16}}>
          ⚠️ {error}
        </div>
      )}

      {loading && <LoadingSpinner message="Fetching weather..."/>}

      {!loading && current && (
        <div style={{background:'#8B1A1A',borderRadius:24,padding:32,boxShadow:'0 8px 32px rgba(139,26,26,0.3)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:20,marginBottom:32}}>
            <div>
              <div style={{color:'rgba(255,255,255,0.85)',fontSize:16,marginBottom:4}}>📍 {current.name}, {current.sys.country}</div>
              <div style={{color:'rgba(255,255,255,0.6)',fontSize:13,marginBottom:12}}>{new Date(current.dt*1000).toLocaleDateString('en-PH',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</div>
              <div style={{color:'#fff',fontSize:72,fontWeight:700,lineHeight:1,marginBottom:8}}>{Math.round(current.main.temp)}°C</div>
              <div style={{color:'rgba(255,255,255,0.8)',fontSize:18}}>{current.weather[0].description.charAt(0).toUpperCase()+current.weather[0].description.slice(1)}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
              <img src={getWeatherIconUrl(current.weather[0].icon)} alt="" style={{width:96,height:96}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {[['Feels like',`${Math.round(current.main.feels_like)}°C`],['Humidity',`${current.main.humidity}%`],['Wind',`${(current.wind.speed*3.6).toFixed(1)} km/h`],['Pressure',`${current.main.pressure} hPa`]].map(([l,v])=>(
                  <div key={l} style={{textAlign:'center'}}>
                    <div style={{color:'rgba(255,255,255,0.6)',fontSize:11,marginBottom:2}}>{l}</div>
                    <div style={{color:'#fff',fontSize:15,fontWeight:600}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ForecastDisplay forecast={forecast}/>
        </div>
      )}
    </div>
  )
}