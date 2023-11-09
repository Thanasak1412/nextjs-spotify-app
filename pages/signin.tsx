import AuthForm from '../components/authForm';

const SignIn = () => {
  return <AuthForm mode="Sign In" url="signin" />;
};

SignIn.authPage = true;

export default SignIn;
