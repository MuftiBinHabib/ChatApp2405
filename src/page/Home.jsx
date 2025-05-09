import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
   <div className="container">
    <section>
        <h2>ChatApp</h2>

        <ul>
            <li><Link to="login">Login/Sign Up</Link></li>
        </ul>
    </section>
   </div>
  )
}

export default Home