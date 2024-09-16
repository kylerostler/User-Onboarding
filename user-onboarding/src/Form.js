import React from 'react';

export default function UserForm(props) {
    const {
        values,
        submit,
        change,
        errors
    } = props;

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
      }

    return (
        <form className='user-form-container' onSubmit={onSubmit}>
            <div className='user-group submit'>
                <h2>register</h2>

                <button id='submitBtn'>submit</button>

                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>

                <div className='user-group inputs'>
                    <label>Username
                        <input
                            value={values.username}
                            onChange={onChange}
                            name='first_name'
                            type='text'
                        />
                    </label>

                    <label>Email
                        <input
                            value={values.email}
                            onChange={onChange}
                            name='email'
                            type='email'
                        />
                    </label>

                    <label>Password
                        <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                        />
                    </label>
                   </div>  {/**ends user input div */}

                <div>
                <h3>Terms and Conditions</h3>
                    <label>I have read, and agree to the terms and conditions.
                        <input
                            type='checkbox'
                            name='terms'
                            checked={values.terms}
                            onChange={onChange}
                        />
                    </label>
                </div>
        </form>
    )
}