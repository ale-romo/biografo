import Button from "components/Button/Button";
import cookie from 'js-cookie';
import $ from 'jquery';
import { useState } from "react";

const SignIn = ({ cb }:any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const submit = async () => {
    const data = {
      username: userName,
      password: password,
    }
    console.log(data)
    try {
      // $.ajax("https://biografoimaginario.com:8888/signUp",
			// 	{
			// 		method: 'POST',
			// 		xhrFields: { withCredentials: true },
			// 		data: data,
			// 		crossDomain: true,
      //     headers: {
      //       'Access-Control-Allow-Origin': 'http://192.168.11.255:3000/',
      //     },
			// 		success: () => {console.log('Success')}
			// 	}
			// 	);
      const response = await fetch('https://biografoimaginario.com:8888/signUp/', {
        method: 'POST',
        // credentials: 'include',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
      });

      console.log(response)
    } catch (error) {
      console.error(error);
    }
    cb();
    // cookie.set('user', 'alex', { expires: 100 });
  };

  return <>
    <input type="text" id="email" onChange={(e) => setUserName(e.target.value)} value={userName}/>
    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
    <Button action={submit}>Sign in</Button>
  </>
};

export default SignIn;
