import React, { useState } from 'react'



function App() {


  const [state, setState] = useState({
    login: '',
    password: '',
   
  })
  
  
  const [error, setError] = useState({
    login: '',
    password: '',
  })


  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    //console.log(e.target.value)
    setError({ ...error, [e.target.name]: ""})
  }


  const register = (e) => {
    let errorNetwork={};
    e.preventDefault();
    if( !state.login){
      errorNetwork.loginError = 'Login is not defined'
      //console.log(errorNetwork.login)
    }
    if( !state.password){
      errorNetwork.passwordError = 'Password is not defined'
    }
  

    //  || !state.login || !state.password || !state.password_confirmation? console.log('Error')
  
    if(Object.keys(errorNetwork).length>0){
        return setError(errorNetwork)
    }else{
      setError(null || {})
      fetch("http://localhost:5000/register", {
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
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    }

}

const  {loginError,  passwordError} = error

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
        <button onClick={register}>Send</button>

      </form>
    </div>
  )



}



export default App;
