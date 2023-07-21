import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { SectionWrapper } from 'components/TextFormats/TextFormats';
import Button from "components/Button/Button";
const submit = () => {
  console.log('sent');
  return
}

const Form  = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Contacto: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return <SectionWrapper style={{ width: "100vw", maxWidth: "1200px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
    <Form>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}placeholder="Nombre" />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Email" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje"></textarea>
      <Button action={submit}>Enviar</Button>
    </Form>
  </SectionWrapper>
};

export default Contacto;
