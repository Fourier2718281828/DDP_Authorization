import React, { useState } from 'react'



function App() {


  const [state, setState] = useState({
    login: '',
    password: '',
  
  })



  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    //console.log(e.target.value)
  }
  const loginF = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: 'POST',

      body: JSON.stringify({
        login: state.login,
        password: state.password,
      
      }),
      headers: {
        'Content-Type': 'application/json',  // Додано заголовок Content-Type
      },
    })
      .then((response) => response.json())
      .then((response) => console.log('ReS'+JSON.stringify(response)))
      .catch((error) => console.log(error))


  }

  return (
    <div>
      <h1>Login</h1>
      <form>
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
        <button onClick={loginF}>Send</button>
      </form>
    </div>
  )



}



export default App;
