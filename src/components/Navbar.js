import React from 'react'
import { Link } from 'react-router-dom'
import {Form} from  'react-bootstrap'
// import '../styles/Navbar.css'

export const Navbar = (props) => {
  const handleAPI = (e)=>{
    props.handle(e.target.value);
}
  return (
    <nav>
        <div className='list-menu-navbar'>
            <Link to="/">home</Link>
            <Link to="/coin-list">Coin list</Link>
        </div>
        <Form.Select onChange={handleAPI} style={{height:"40px", width:"220px"}}>
            <option>Open this select menu</option>
            <option value="https://api.coinpaprika.com/v1/coins/">coin paprika</option>    
        </Form.Select>
    </nav>
  )
}
