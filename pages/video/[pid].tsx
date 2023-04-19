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
import URL_QR from "components/URL_QR/URL_QR";

const Loader = styled.div`
  width: 100%;
  padding: 100%;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

const Form  = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 500px;
  background: #efefef;
  padding: 50px;
`;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async ({params}: any) => {
  const videoRes: any =  await fetch(`https://biografoimaginario.com:8888/getVideos?ID=${params.pid}`)
  const video = await videoRes.json();

  return {
    props: {
      video: video,
    }
  }
}

const submit = () => {
  console.log('sent');
  return
}

const PerfilVideo: NextPage = ({ video, pid }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { username } = useContext(LoginContext);
  
  if(video){
    video = video[0];
  }

  let videoElement = <></>
  if(video){
    videoElement = <> <h1>{video.title}</h1>
                    <video autoPlay={false} controls={true}>
                    <source src={`https://biografoimaginario.com:8888/uploads${video.videoURL}`} />
                    </video>
                    <h2>Historia del Objeto</h2><p>{video.history}</p>
                    <a href={`/objeto/${video.objectID}`}>Ir al objeto</a><br/>
    </>
  }

  return <>
    {video &&
      <>
        {videoElement}
        <h2>¿Quieres compartir este recuerdo?</h2>
        <URL_QR></URL_QR>
        <br></br>
      </>
    }
  </>
};

export default PerfilVideo;
