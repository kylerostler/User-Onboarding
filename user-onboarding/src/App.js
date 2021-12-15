import logo from './logo.svg';
import './App.css';
import Form from './Form';
import schema from './formSchema';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  terms: '',
}

const initialUsers = [];

function App() {
  //states
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  //helpers
  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
    .then(response => {
      console.log(response)
    })
    .catch(error => console.error(error))
  }

  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
    .then(response => {
      setUsers([ response.data, ...users])
    }).catch(error => console.error(error))
    .finally(() => setFormValues(initialFormValues))
  }
  
  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }
  //event handlers
  //side effects
  //return
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
