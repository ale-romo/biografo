import { useState, useContext } from "react";
import Button from "components/Button/Button";
import { LoginInput } from 'components/TextFormats/TextFormats';
import { LoginContext } from 'components/User/userContext';
import Cookies from "js-cookie";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  justify-content: space-evenly;
`;

const Header = styled.h2`
`;

interface robotProps {
  checked: boolean;
}

const RobotContainer = styled.div`
  background: #EEEEFF;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

const Robot = styled.span<robotProps>`
${({ checked }) => `
  width: 24px;
  height: 24px;
  border-radius: 12px;
  position: relative;
  border: 1px solid black;
  background-color: white;
  background: ${checked ? 'black' : 'white'};
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 5px;
    border-bottom: 4px solid white;
    border-left: 4px solid white;
    transform: rotate(-45deg);
    top: 5px;
    left: 4px;
  }
`};
`;

const Divider = styled.div`
  width: 1px;
  height: 60%;
  background: gray;
`
const FormContainer = styled.div`
  width: 30%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Error = styled.div`
  color: #e06161;
`

const Session = () => {
  const { setUsername } = useContext(LoginContext);
  const [signUpUserName, setSignUpUserName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signInUserName, setSignInUserName] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [humanity, setHumanity] = useState(true);

  const signUp = async () => {
    try {
      let response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
        credentials: 'include',
        body: JSON.stringify({
            username: signUpUserName,
            password: signUpPassword,
        })
      });

      const data  =  await response.json();

      if (data?.passport?.user && setUsername) {
        Cookies.set('user', data.passport.user, { expires: 100});
        setUsername(data.passport.user);
      } else if (data?.error) {
        setSignUpError(data.error);
      }

    } catch (error) {
      console.error(error);
    }

  };

  const signIn = async () => {
    try {
      let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
        credentials: 'include',
        body: JSON.stringify({
            username: signInUserName,
            password: signInPassword,
        })
    })

      const data  =  await response.json();

      if (data?.passport?.user && setUsername) {
        Cookies.set('user', data.passport.user, { expires: 100});
        setUsername(data.passport.user);
      } else if (data?.error) {
        setSignInError(data.error);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return <Container>
    <FormContainer>
      <Header>¿Eres nuevo?</Header>
      <Form>
        {signUpError &&
          <Error>{signUpError}</Error>
        }
        <LoginInput type="text" onChange={(e) => setSignUpUserName(e.target.value)} value={signUpUserName}/>
        <LoginInput type="password" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
        <RobotContainer>
          Soy un robot
          <Robot checked={!humanity} onClick={() => setHumanity(!humanity)}/>
        </RobotContainer>
        <Button action={signUp} disabled={humanity}>Crear cuenta</Button>
      </Form>
    </FormContainer>
    <Divider />
    <FormContainer>
      <Header>¿Ya tienes una cuenta?</Header>
      <Form>
        {signInError &&
          <Error>{signInError}</Error>
        }
        <LoginInput type="text" onChange={(e) => setSignInUserName(e.target.value)} value={signInUserName}/>
        <LoginInput type="password" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
        <Button action={signIn}>Iniciar sesión</Button>
      </Form>
    </FormContainer>
  </Container>
};

export default Session;
