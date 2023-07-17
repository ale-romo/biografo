import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import probe from 'probe-image-size';
import Carousel from 'components/Carousel/Carousel';
import Modal from 'components/Modal/Modal';
import Card from 'components/Cards/CardB';
import CardC from 'components/Cards/CardC';
import Sticker from 'components/Sticker/Sticker';

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
  return <>
  <Sticker></Sticker>
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
            isVideo: false,  
          };
          return <CardC key={i} {...cardProps} />
        })}
      </Carousel>
    }
  </>
}

export default HomePage;
