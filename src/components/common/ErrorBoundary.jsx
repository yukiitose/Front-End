import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{textAlign:'center',padding:'60px 20px'}}>
          <div style={{fontSize:48,marginBottom:12}}>⚠️</div>
          <h3 style={{color:'#fff',fontSize:20,margin:'0 0 8px'}}>Something went wrong</h3>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:14,marginBottom:16}}>{this.state.error?.message}</p>
          <button onClick={() => this.setState({hasError:false,error:null})} style={{background:'#3b82f6',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',cursor:'pointer',fontSize:14}}>Try Again</button>
        </div>
      )
    }
    return this.props.children
  }
}