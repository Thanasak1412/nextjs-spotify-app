import AuthForm from '../components/authForm';

const SignUp = () => {
  return <AuthForm mode="Sign Up" url="signup" />;
};

SignUp.authPage = true;

export default SignUp;
