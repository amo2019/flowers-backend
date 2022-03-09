import React, { useState, useReducer } from 'react';
import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import style from "../../styles/SignUp.module.css";
import {
  useSginup,
} from "../../zustand-store"


const SignUp = () => {
  const sginup = useSginup();
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const INITIAL_STATE = {
    currentUser: null,
    error: null
  };

  const { displayName, email, password, confirmPassword } = userCredentials;
  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    sginup(userCredentials);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className={style.container}>
    <div className={style.signUpContainer}>
      <p>I do not have a account</p>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
    </div>
  );
};


export default SignUp;
