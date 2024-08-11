import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { login } from '../utils/APIRoutes'

function Login () {
  const [value, setValue] = useState({
    name: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (handleValidation()) {
      try {
        const { name, password } = value

        // Make the API call
        const { data } = await axios.post(login, { name, password })
        // console.log(JSON.stringify(data, null, 2));
        // Process the response if it's successful
        console.log("data from server "+data.success)
        if (data.success) {
            // toast.success(data.message
          console.log('login success:', data.user)
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          navigate('/')
        }
      } catch (error) {
        // Handle the error if the status code is 400 or any other
        if (error.response) {
          console.error('Error response:', error.response.data.message)
          toast.error(error.response.data.message, toastOptions)
        } else {
          console.error('Error message:', error.message)
          toast.error('An unexpected error occurred.')
        }
      }
    }
  }

  const toastOptions = {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light'
    // transition: Bounce,
  }
  const handleValidation = () => {
    console.log('in validation')
    const { name, password} = value
    if (
      name === '' ||
      password === ''
    ) {
      toast.error('Please fill all the fields', toastOptions)
      return false
    }
    if (name.length < 3) {
      toast.error('name must be at least 3 characters', toastOptions)

      return false
    }
    if (password.length < 8) {
      toast.error('password must be at least 8 characters', toastOptions)

      return false
    }
    return true
  }
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={event => handleSubmit(event)}>
          <div className='brand'>
            <img src={logo} alt='logo' />
            <h1>snappy</h1>
          </div>
          <input
            onChange={onChange}
            type='text'
            placeholder='Username'
            name='name'
          />
          <input
            onChange={onChange}
            type='password'
            placeholder='Password'
            name='password'
          />
          <button type='submit'>Login</button>
          <span>
            Don&apos;t have an account? 
            <Link to='/register'> register here</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
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
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      color: white;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      width: 100%;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 0.4rem;
      transition: 0.5s ease-in-out;
      font-weight: bold;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`

export default Login
