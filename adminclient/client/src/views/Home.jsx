import React from 'react'
import {Link} from "react-router-dom"

export default function Home() {
      return (
            <div>
                  <h1>Home</h1>
                  <Link to="login">login</Link> <br />
                  <Link to="register">register</Link>
                  <Link to="profile">user</Link>

                  
            </div>
      )
}
