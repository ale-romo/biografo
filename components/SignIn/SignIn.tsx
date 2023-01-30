import Button from "components/Button/Button";
import cookie from 'js-cookie';

const SignIn = ({ cb }:any) => {
  const submit = () => {
    cb();
    cookie.set('user', 'alex', { expires: 100 });
  };

  return <>
    <input type="text" id="email" />
    <input type="password" id="password" />
    <Button action={submit}>Sign in</Button>
  </>
};

export default SignIn;
