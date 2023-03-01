import { NextPage } from "next";
import probe from 'probe-image-size';
import Image from "next/image";
import { useContext, useState } from "react";
import styled from "styled-components";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Session from "components/User/Session";
import Carousel from "components/Carousel/Carousel";
import { LoginContext } from "components/User/userContext";

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
  const itemRes: any = await fetch(`https://biografoimaginario.com:8888/getObjects?ID=${params.pid}`);
  const itemData = await itemRes.json();
  const item = itemData[0];
  const videoRes: any =  await fetch(`https://biografoimaginario.com:8888/getVideos?ID=${params.pid}`)

  const video = await videoRes.json();

  const images = JSON.parse(item.images);

  item.imagesWithSizes = await Promise.all(
    images.map(async (image: string) => {
      return {
        url: `https://biografoimaginario.com:8888/${image}`,
        size: await probe(`https://biografoimaginario.com:8888/${image}`)
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
  const { username } = useContext(LoginContext);
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
          {/* <source src={`https://biografoimaginario.com:8888${video[0].videoURL}`} /> */}
        </video>
        {username ?
          <Button action={`/capturar/${item.objectID}`}>Comprar ahora</Button> :
          <Modal triggerText="Regístrate para comprar" isOpen={modalIsOpen}>
            <Session />
          </Modal>
        }
      </>
    }
  </>
};

export default PerfilObjeto;
