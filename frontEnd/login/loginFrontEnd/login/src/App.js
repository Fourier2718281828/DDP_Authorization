import React, { useState } from 'react';

function App() {
  const [state, setState] = useState({
    login: '',
    password: '',
  });

  const [error, setError] = useState({
    login: '',
    password: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Додано стан авторизації

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  const register = (e) => {
    e.preventDefault();
    const errorNetwork = {};
    if (!state.login) {
      errorNetwork.loginError = 'Login is not defined';
    }
    if (!state.password) {
      errorNetwork.passwordError = 'Password is not defined';
    }

    if (Object.keys(errorNetwork).length > 0) {
      return setError(errorNetwork);
    } else {
      setError({});
      fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({
          login: state.login,
          password: state.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            console.log(response);
            setIsLoggedIn(true); // Встановлюємо стан авторизації на true
          } else {
            console.log('Login failed');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const { loginError, passwordError } = error;

  return (
    <div>
      {isLoggedIn ? ( // Відображаємо компонент після логіна
        <div>
          <h1>Welcome to the Secure Area</h1>
          <p>This is the content for authorized users.</p>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form>
            <label htmlFor="login" />
            <input
              type="login"
              value={state.login}
              name="login"
              placeholder="login"
              onChange={onChange}
              id="login"
            />
            {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

            <label htmlFor="password" />
            <input
              type="password"
              value={state.password}
              name="password"
              placeholder="password"
              onChange={onChange}
              id="password"
            />
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            <button onClick={register}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
