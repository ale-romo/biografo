import { NextPage } from "next";
import probe from 'probe-image-size';
import Image from "next/image";
import { useState } from "react";
import cookie from 'js-cookie';
import styled from "styled-components";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import SignIn from "components/Session/Session";
import Carousel from "components/Carousel/Carousel";

const Loader = styled.div`
  width: 100%;
  padding: 100%;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async ({params}: any) => {
  const itemRes: any = await fetch(`http://biografoimaginario.com:8888/getObjects?ID=${params.pid}`);
  const itemData = await itemRes.json();
  const item = itemData[0];
  const videoRes: any =  await fetch(`http://biografoimaginario.com:8888/getVideos?ID=${1}`)
  const video = await videoRes.json();

  const images = JSON.parse(item.images);

  item.imagesWithSizes = await Promise.all(
    images.map(async (image: string) => {
      return {
        url: `http://biografoimaginario.com:8888/${image}`,
        size: await probe(`http://biografoimaginario.com:8888/${image}`)
      }
    })
  );

  return {
    props: {
      item: item,
      video: video,
    }
  }
}

const PerfilObjeto: NextPage = ({ item, video }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const session = cookie.get('user');

  return <>
    {item &&
      <>
        <Carousel title={item.title}>
          {item.imagesWithSizes.map((image: any, i : number) => {
            return <Image
              key={i}
              src={image.url}
              alt=""
              width={image.size.width / 10}
              height={image.size.height / 10}
            />
          })}
        </Carousel>
        <h3>{!item.soldUserId ? 'En venta' : 'Vendido'}</h3>
        <p>{item.description}</p>
        <p>{item.history}</p>
        <h2>Video</h2>
        <video>
          {/* <source src={`http://biografoimaginario.com:8888${video[0].videoURL}`} /> */}
        </video>
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
