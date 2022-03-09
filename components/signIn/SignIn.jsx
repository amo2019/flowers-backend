import React, { useState, useReducer } from 'react';
import CustomButton from '../customButton/CustomButton';
import FormInput from '../formInput/FormInput';
import style from "../../styles/SignIn.module.css";

import {
  useLogin,
  UserData,
} from "../../zustand-store"

const SignIn = () => {
  const login = useLogin();
  const [userCredentials, setUserCredentials] = useState({
    email: 'zara@gmail.com',
    password: '123456',
  });
  const INITIAL_STATE = {
    currentUser: null,
    error: null
  };

  const { email, password } = userCredentials;
  const handleSubmit = async event => {
    event.preventDefault();
    login(userCredentials);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

 return (
  <div className={style.container}>
    <div className={style.signInContainer}>
      <p>I already have an account</p>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
      <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          placeholder="zara@gmail.com"
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          placeholder="123456"
          required
        />
        <div className={style.buttonsBarContainer}>
          <CustomButton type='submit'> Sign in </CustomButton>
        </div>
      </form>
    </div>
    </div>
  );
};


export default SignIn;