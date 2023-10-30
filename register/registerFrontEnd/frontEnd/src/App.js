import React, { useState } from 'react'



function App() {


  const [state, setState] = useState({
    username: '',
    login: '',
    password: '',
    password_confirmation: '',
  })
  
  
  const [error, setError] = useState({
    username: '',
    login: '',
    password: '',
    password_confirmation: '',
  })


  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    //console.log(e.target.value)
    setError({ ...error, [e.target.name]: ""})
  }


  const register = (e) => {
    let errorNetwork={};
    e.preventDefault();
    if( !state.username){
      errorNetwork.usernameError = 'User is not defined'
    }
    if( !state.login){
      errorNetwork.loginError = 'Login is not defined'
      //console.log(errorNetwork.login)
    }
    if( !state.password){
      errorNetwork.passwordError = 'Password is not defined'
    }
    else if(state.password !== state.password_confirmation){
     errorNetwork.passwordMatchError = 'Password_confirmation != Password'
    }
    else{
      setError(null || {})
    }
   if(!state.password_confirmation){
    errorNetwork.passwordConfirmationError = 'Password_confirmation is not defined'
   }

   if(state.password.length>10 ){
    errorNetwork.passwordStateError = 'Password is  more 10 symbol'
   }

    //  || !state.login || !state.password || !state.password_confirmation? console.log('Error')
  
    if(Object.keys(errorNetwork).length>0){
        return setError(errorNetwork)
    }else{
      setError(null || {})
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
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    }

}

const  {usernameError, 
  loginError, 
  passwordError, 
  passwordConfirmationError,  
  passwordMatchError, passwordStateError} = error

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
           {usernameError && <div style={{color:'red'}}>{usernameError}</div>}

        <label htmlFor='login' />
        <input 
          type='login'
          value={state.login}
          name='login'
          placeholder='login'
          onChange={onChange}
          id='login'
          />
           {loginError && <div style={{color:'red'}}>{loginError}</div>}
          
        <label htmlFor='password' />
        <input
          type='password'
          value={state.password}
          name='password'
          placeholder='password'
          onChange={onChange}
          id='password' />
           {passwordError && <div style={{color:'red'}}>{passwordError}</div>}
           {passwordMatchError && <div style={{color:'red'}}>{passwordMatchError}</div>}
           {passwordStateError && <div style={{color:'red'}}>{passwordStateError}</div>}

        <label htmlFor='password_confirmation' />
        <input
          type='password_confirmation'
          value={state.password_confirmation}
          name='password_confirmation'
          placeholder='password_confirmation'
          onChange={onChange}
          id='password_confirmation' />
          {passwordConfirmationError && <div style={{color:'red'}}>{passwordConfirmationError}</div>}
        <button onClick={register}>Send</button>

      </form>
    </div>
  )



}



export default App;
