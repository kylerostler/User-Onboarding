import logo from './logo.svg';
import './App.css';
import UserForm from './Form';
import schema from './formSchema';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User'


const initialFormValues = {
  first_name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  first_name: '',
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
      setUsers(response.data.data);
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
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
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
