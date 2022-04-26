import React, { useState, useReducer } from 'react';
import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import style from "../../styles/SignUp.module.css";
import {validateEmail} from '../utils/utils'
import {
  useSginup, UserData,
} from "../../zustand-store"


const SignUp = () => {
  const sginup = useSginup();
  const user = UserData();
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

/*     if (!validateEmail(email)) {
      console.log("invalid email");
      return;
    } */
    if (password !== confirmPassword) {
      console.log("passwords don't match");
      return;
    }
    sginup(userCredentials);
    if(user.user){
      try {
        const req = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            name,
          })
        });
        const res = await req.json();
      } catch (err) {
        console.log(err);
      }
    }
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
      <form onSubmit={handleSubmit}>
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
