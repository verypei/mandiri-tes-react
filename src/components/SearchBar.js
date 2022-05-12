import React from 'react'
import {Form} from  'react-bootstrap'
export default function SearchBar(props) {
    const handleAPI = (e)=>{
        props.handle(e.target.value)
    }
  return (
    <>
        <Form.Select onChange={handleAPI}>
            <option>Open this select menu</option>
            <option value="https://api.coinpaprika.com/v1/coins/">coin paprika</option>    
        </Form.Select>
    </>
  )
}
