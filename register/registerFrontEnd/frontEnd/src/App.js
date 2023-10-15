import React, { useState } from 'react'



function App() {


  const [state, setState] = useState({
    username: '',
    login: '',
    password: '',
    password_confirmation: '',
  })



  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    //console.log(e.target.value)
  }
  const register = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: 'POST',

      body: JSON.stringify({
        username: state.username,
        login: state.login,
        password: state.password,
        password_confirmation: state.password_confirmation
      }),
      headers: {
        'Content-Type': 'application/json',  // Додано заголовок Content-Type
      },
    })
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log(error))


  }

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor='username' />
        <input
          type='username'
          value={state.username}
          name='username'
          placeholder='username'
          onChange={onChange}
          id='username' />
        <label htmlFor='login' />
        <input
          type='login'
          value={state.login}
          name='login'
          placeholder='login'
          onChange={onChange}
          id='login' />

        <label htmlFor='password' />
        <input
          type='password'
          value={state.password}
          name='password'
          placeholder='password'
          onChange={onChange}
          id='password' />

        <label htmlFor='password_confirmation' />
        <input
          type='password_confirmation'
          value={state.password_confirmation}
          name='password_confirmation'
          placeholder='password_confirmation'
          onChange={onChange}
          id='password_confirmation' />
        <button onClick={register}>Send</button>
      </form>
    </div>
  )



}



export default App;
