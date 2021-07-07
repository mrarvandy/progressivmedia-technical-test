import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

function Edit() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const dispatch = useDispatch()
  
  const editHandler = () => {
    if (!name || !birthdate) {
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
        title: 'Invalid Name / Birthdate'
      })
    } else {
      const payload = {
        name: name,
        birthdate: birthdate
      }
      dispatch({ type: 'editUser', payload: payload })
      history.push('/'  )
    }
  }

  if (!localStorage.getItem('email')) {
    return (
      <Redirect to='/login' />
    )
  } else {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h1 style={{textAlign: 'center'}}>Edit</h1>
          <br/>
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(event => {
                setName(event.target.value)
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input
              type="date"
              className="form-control"
              onChange={(event => {
                setBirthdate(event.target.value)
              })}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={(event) => {
              event.preventDefault()
              editHandler()
            }}>Submit</button>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={(event) => {
              event.preventDefault()
              history.push('/')
            }}>Go Back</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;