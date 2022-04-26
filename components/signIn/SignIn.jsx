import React, { useState, useReducer } from 'react';
import CustomButton from '../customButton/CustomButton';
import FormInput from '../formInput/FormInput';
import style from "../../styles/SignIn.module.css";
import {validateEmail} from '../utils/utils'

import {
  useLogin,
  UserData,
  uidData
} from "../../zustand-store"

const SignIn = () => {
  const login = useLogin();
  const user = UserData();
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
/*     if (!validateEmail(email)) {
      console.log("invalid email");
      return;
    } */
    login(userCredentials);
    try {
      const req = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name: email?.split('@')[0],
        })
      });
      const res = await req.json();
    } catch (err) {
      console.log(err);
    }
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