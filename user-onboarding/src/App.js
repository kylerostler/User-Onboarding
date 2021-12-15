import logo from './logo.svg';
import './App.css';
import UserForm from './Form';
import schema from './formSchema';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User'


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
      console.log(response.data.data)
      setUsers(response.data.data);
    })
    .catch(error => console.error(error))
  }

  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
    .then(response => {
      console.log(response.data)
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
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['accept'].filter(term => !!formValues[term])
    }
    postNewUser(newUser);
  }

  //side effects
  useEffect(() => {
    getUsers()
  }, [])

  //return
  return (
    <div className="App">
      <header className="App-header">
        <UserForm 
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          errors={formErrors}
        />
      </header>
      {users.map(user => {
        return (
          <User key={user.id} details={user} />
        )
      })
     }
    </div>
  )
}

export default App;


/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */