import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Admin_Home.css'

const Admin_Home = () => {
  return (
    <div className='Cards-Container'>
        <Link className="card" to='item-entry'>
            Item Entry
        </Link>
        <Link className="card" to='items'>
            Item Return
        </Link>
        <Link className="card" to='all-entries'>
            All Entries
        </Link>
    </div>
  )
}

export default Admin_Home