import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import probe from 'probe-image-size';
import Carousel from 'components/Carousel/Carousel';
import Modal from 'components/Modal/Modal';
import Card from 'components/Cards/CardB';
import CardC from 'components/Cards/CardC';
import Sticker from 'components/Sticker/Sticker';

import { useEffect } from 'react';

import {
  NegativeText,
  LargeText,
  SectionWrapper,
  Link1,
} from 'components/TextFormats/TextFormats';

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getStaticProps = async () => {
  const res: any = await fetch('https://biografoimaginario.com:8888/getAllObjects');
  const data = await res.json();
  const itemsWithImageSizes = await Promise.all(
    data.map(async (item: any) => {
      const imageWithSize = {
        url: `https://biografoimaginario.com:8888${JSON.parse(item.images)[0]}`,
        size: await probe(`https://biografoimaginario.com:8888${JSON.parse(item.images)[0]}`),
      }
      item.imageWithSize = imageWithSize;
      return item;
    })
  );
  const videoRes: any = await fetch(`https://biografoimaginario.com:8888/getAllVideos`);
  const videoData = await videoRes.json();
  
  shuffleArray(videoData);
  shuffleArray(itemsWithImageSizes);

  return {
    props: {
      items: itemsWithImageSizes,
      videos: videoData
    }
  }
}

const HomePage = ({ items, videos }: any) => {
  const sendProps = (item: any) => {
    Router.push({
      pathname: `/objeto/${item.objectID}`,
    });
  }
  const sendVideoProps = (video: any) => {
    Router.push({
      pathname: `/video/${video.videoID}`,
    });
  }
  return 			<SectionWrapper style={{ width: "100vw", maxWidth: "1200px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
  <Sticker></Sticker>
  <span>Estos artículos están a la venta. <span style={{color: 'white', background: 'black'}}>Su precio no es dinero</span>, sino recuerdos para el <span style={{fontFamily:"\"futura-pt\",sans-serif", letterSpacing: "-1px", fontSize: "1.5rem"}}>biógrafoImaginario</span></span>
    {items &&
      <Carousel title="Artículos destacados">
        {items.map((item: any, i: number) => {
          const cardProps = {
            src: item.imageWithSize.url,
            title: item.title,
            sold: item.soldUserId,
            action: () => sendProps(item),
          };
          return <Card key={i} {...cardProps} />
        })}
      </Carousel>
    }
    {videos &&
      <Carousel title="Recuerdos destacados">
        {videos.map((video: any, i: number) => {
          const cardProps = {
            src: `https://biografoimaginario.com:8888/thumbs${video.videoURL.replace('mp4', 'png')}`,
            title: video.title,
            description: video.description,
            action: () => sendVideoProps(video),
            isVideo: false,  
          };
          return <CardC key={i} {...cardProps} />
        })}
      </Carousel>
    }
  </SectionWrapper>
}

export default HomePage;
