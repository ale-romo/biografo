import { NextPage } from "next";
import { useRouter } from 'next/router';
import probe from 'probe-image-size';
import Image from "next/image";
import { useState } from "react";
import cookie from 'js-cookie';
import styled from "styled-components";
import { useFetch } from 'lib/hooks/useFetch';
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import SignIn from "components/SignIn/SignIn";
import Carousel from "components/Carousel/Carousel";

const Loader = styled.div`
  width: 100%;
  padding: 100%;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

// export const getStaticProps = async (context) => {
//   const params = { context };
//   const res: any = await fetch('http://biografoimaginario.com:8888/getAllObjects');
//   const data = await res.json();
//   const item = data.find(((item: { objectID: number; }) => item.objectID === Number(params.pid)));
//   // const itemsWithImageSizes = await Promise.all(
//   //   data.map(async (item: any) => {
//   //     const imageWithSize = {
//   //       url: `https://biografoimaginario.com${JSON.parse(item.images)[0]}`,
//   //       size: await probe(`https://biografoimaginario.com${JSON.parse(item.images)[0]}`),
//   //     }
//   //     item.imageWithSize = imageWithSize;
//   //     return item;
//   //   })
//   // );

//   return {
//     props: {
//       items: itemsWithImageSizes,
//     }
//   }
// }

const PerfilObjeto: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const session = cookie.get('user');
  const router = useRouter();
  const { pid } = router.query;
  let item;

  const {data, loading, error}: any = useFetch('http://biografoimaginario.com:8888/getAllObjects');

  if (error) console.log(error);
  if (data) {
    item = data.find(((item: { objectID: number; }) => item.objectID === Number(pid)));
  }

  return <>
    {loading && <Loader>Loading...</Loader>}
    {data &&
      <>
        <Carousel title={item.title}>
          {JSON.parse(item.images).map((image: string, i : number) => (
            <Image
              key={i}
              src={`http://biografoimaginario.com:8888${image}`}
              alt=""
              width={300}
              height={300}
            />))}
        </Carousel>
        <h3>{!item.soldUserId ? 'En venta' : 'Vendido'}</h3>
        <p>{item.description}</p>
        <p>{item.history}</p>
        {session ?
          <Button action={`/capturar/${item.objectID}`}>Comprar ahora</Button> :
          <Modal triggerText="Regístrate para comprar" isOpen={modalIsOpen}>
            <SignIn cb={setModalIsOpen} />
          </Modal>
        }
      </>
    }

  </>
};

export default PerfilObjeto;
