import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState } from "react";
import cookie from 'js-cookie';
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import SignIn from "components/SignIn/SignIn";

const PerfilObjeto: NextPage = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const session = cookie.get('user');

  const {
    query: {images, id, title, description, history, isAvailable},
  } = router;
  console.log(id)
  return <>
  {images && JSON.parse(images).map((image: string, i : number) => (
    <Image
      key={i}
      src={`https://biografoimaginario.com${image}`}
      alt=""
      width={300}
      height={300}
    />))}
  <h2>{title}</h2>
  <h3>{isAvailable ? 'En venta' : 'Vendido'}</h3>
  <p>{description}</p>
  <p>{history}</p>
    {session ?
      <Button action={`/capturar/${id}`}>Comprar ahora</Button> :
      <Modal triggerText="Registrate para comprar" isOpen={modalIsOpen}>
        <SignIn cb={setModalIsOpen} />
      </Modal>
    }

  </>
}

export default PerfilObjeto;
