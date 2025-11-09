import React, { useState } from 'react'

const API_URL = 'https://vernanbackend.ezlab.in/api/contact-us/'

export default function ContactForm(){
  const [form, setForm] = useState({name:'',email:'',phone:'',message:''})
  const [status, setStatus] = useState({type:'', message:''})
  const [loading, setLoading] = useState(false)

  const validateEmail = (email) => {
    // simple regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({type:'', message:''})

    // front-end validation
    if(!form.name || !form.email || !form.phone || !form.message){
      setStatus({type:'error', message:'Please fill all fields.'})
      return
    }
    if(!validateEmail(form.email)){
      setStatus({type:'error', message:'Please enter a valid email.'})
      return
    }

    setLoading(true)
    try{
      const res = await fetch(API_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      if(res.ok){
        setStatus({type:'success', message:'Form Submitted'})
        setForm({name:'',email:'',phone:'',message:''})
      } else {
        const text = await res.text()
        setStatus({type:'error', message:'Submission Failed'})
        console.error('API Error', res.status, text)
      }
    } catch(err){
      setStatus({type:'error', message:'Network Error'})
      console.error(err)
    } finally{
      setLoading(false)
    }
  }

  return (
    <section className="contact-section">
      <div className="container contact-inner">
        <h2>Contact Us</h2>
        <p>Fill the form and we will get back to you.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input className="input" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-grid">
            <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <div></div>
          </div>
          <div className="form-grid full">
            <textarea className="input" name="message" placeholder="Message" value={form.message} onChange={handleChange}></textarea>
          </div>
          <div style={{marginTop:12}}>
            <button className="btn" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
          </div>
          {status.message && (
            <div className="status" style={{color: status.type === 'success' ? 'green' : 'crimson'}}>{status.message}</div>
          )}
        </form>
      </div>
    </section>
  )
}
