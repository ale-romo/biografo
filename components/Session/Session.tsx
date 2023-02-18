import Button from "components/Button/Button";
import {LoginInput} from 'components/TextFormats/TextFormats';
import { useState } from "react";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Session = ({ cb }:any) => {
  const [signUpUserName, setSignUpUserName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInUserName, setSignInUserName] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [humanity, setHumanity] = useState(true);

  const signUp = async () => {
    try {
      let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
        credentials: 'include',
        body: JSON.stringify({
            username: {signUpUserName},
            password: {signUpPassword},
        })
    })

      const data  =  await response.json()
      console.log(data);

    } catch (error) {
      console.error(error);
    }
    cb();
    // cookie.set('user', 'alex', { expires: 100 });
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
            username: {signInUserName},
            password: {signInPassword},
        })
    })

      const data  =  await response.json()
      console.log(data);

    } catch (error) {
      console.error(error);
    }
    cb();
    // cookie.set('user', 'alex', { expires: 100 });
  };

  return <Container>
    <div>
      <Header>¿Eres nuevo?</Header>
      <Form>
        <LoginInput type="text" onChange={(e) => setSignUpUserName(e.target.value)} value={signUpUserName}/>
        <LoginInput type="password" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
        <RobotContainer>
          Soy un robot
          <Robot checked={!humanity} onClick={() => setHumanity(!humanity)}/>
        </RobotContainer>
        <Button action={signUp} disabled={humanity}>Iniciar Sesión</Button>
      </Form>
    </div>
    <Divider />
    <div>
      <Header>¿Ya tienes una cuenta?</Header>
      <Form>
        <LoginInput type="text" onChange={(e) => setSignInUserName(e.target.value)} value={signInUserName}/>
        <LoginInput type="password" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
        <Button action={signIn}>Iniciar Sesión</Button>
      </Form>
    </div>
  </Container>
};

export default Session;
