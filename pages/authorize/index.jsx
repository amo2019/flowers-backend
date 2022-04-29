import style from "../../styles/SignInAndSignUp.module.css";

import SignIn from '../../components/signIn/SignIn';
import SignUp from '../../components/signUp/SignUp';

const SignInAndSignUp = () => (
  <div className={style.signInAndSignUpContainer}>
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUp;