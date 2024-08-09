import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Register () {

    const [value, setValue] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

  const handleSubmit = () => {}
  const onChange = (e) =>{
    setValue({...value, [e.target.name]:e.target.value});
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={event => handleSubmit(event)}>
          <div className='brand'>
            <img src={logo} alt='logo' />
            <h1>snappy</h1>
          </div>
          <input onChange={onChange} type='text' placeholder='Username' name='name' />
          <input onChange={onChange} type='email' placeholder='Email' name='email' />
          <input onChange={onChange} type='password' placeholder='Password' name='password' />
          <input
            onChange={onChange}
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
          />
          <button type='submit'>Create User</button>
          <span>
            Already have an account?
            <Link to='/login'>click here</Link>
          </span>
        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121234;
  gap: 1rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      text-transform: uppercase;
      color: white;
    }
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-direction: column;
    background: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color:transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        width: 100%;
        font-size:1rem;
        color: white;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        width: 100%;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 0.4rem;
        transition: 0.5s ease-in-out;
        font-weight: bold;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color:white;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
  }
`

export default Register
