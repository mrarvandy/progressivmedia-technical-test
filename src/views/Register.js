import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

function Register() {
  const history = useHistory()
  const users = useSelector(state => state.users)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState('')
  const dispatch = useDispatch()

  const registerHandler = () => {
    let checkEmail = false
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.match(regexEmail)) {
      checkEmail = true
    }

    if (!checkEmail || password.length < 8) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Invalid E-Mail / Password'
      })
    } else {
      let flag = false
      for (let i = 0; i < users.length; i++) {
        if (email === users[i].email && password === users[i].password) {
          flag = true
        }
      }
      if (!flag && password === validatePassword) {
        const payload = {
          email: email,
          password: password
        }
        dispatch({ type: 'addUser', payload: payload })
        localStorage.setItem('email', email)
        history.push('/')
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'E-Mail / Password Already Inputted'
        })
      }
    }
  }

  if (localStorage.getItem('email')) {
    return (
      <Redirect to = '/' />
    )
  } else {
    return (
      <React.Fragment>
        <div className='container-fluid'>
          <h1 style={{textAlign: 'center'}}>Register</h1>
          <br/>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              className="form-control"
              placeholder="E-Mail"
              onChange={(event => {
                setEmail(event.target.value)
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(event => {
                setPassword(event.target.value)
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Validate Your Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Check Password"
              onChange={(event => {
                setValidatePassword(event.target.value)
              })}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={(event) => {
              event.preventDefault()
              registerHandler()
            }}>Register</button>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={(event) => {
              event.preventDefault()
              history.push('/login')
            }}>Login</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;