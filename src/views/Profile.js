import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'

function Profile() {
  const history = useHistory()
  const users = useSelector(state => state.users)
  const currentUser = users.filter(user => user.email === localStorage.getItem('email'))
  
  const logoutHandler = () => {
    localStorage.clear()
    history.push('/login')
  }

  if (!localStorage.getItem('email')) {
    return (
      <Redirect to='/login' />
    )
  } else {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1 className="display-4">Hello, {currentUser[0].email}!</h1>
          {
            currentUser[0].name
            ? <p className="lead">Name : {currentUser[0].name}</p>
            : null
          }
          <hr className="my-4" />
          {
            currentUser[0].birthdate
            ? <p>Birthdate : {currentUser[0].birthdate}</p>
            : null
          }
          <p className="lead">
            <button
              type="button"
              className="btn btn-primary mx-3"
              onClick={(event) => {
                event.preventDefault()
                history.push('/edit')
              }}>Edit</button>
            <button
              type="button"
              className="btn btn-primary mx-3"
              onClick={(event) => {
                event.preventDefault()
                logoutHandler()
              }}>Logout</button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;