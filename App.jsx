import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App(){
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="features">
          <div className="container">
            <h2>Features</h2>
            <div className="cards">
              <div className="card">
                <h3>Fast</h3>
                <p>Lightweight and responsive UI.</p>
              </div>
              <div className="card">
                <h3>Reliable</h3>
                <p>Simple contact form with API integration.</p>
              </div>
              <div className="card">
                <h3>Clean</h3>
                <p>Modular code structure, easy to read.</p>
              </div>
            </div>
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
