import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import probe from 'probe-image-size';
import Carousel from 'components/Carousel/Carousel';
import Modal from 'components/Modal/Modal';
import Card from 'components/Cards/CardB';
import {
  NegativeText,
  LargeText,
  SectionWrapper,
  Link1,
} from 'components/TextFormats/TextFormats';
import Webcam from 'react-webcam';

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

import VideoRecorder from 'components/Webcam/Webcam'

export const getStaticProps = async () => {
  const res: any = await fetch('http://biografoimaginario.com:8888/getAllObjects');
  const data = await res.json();
  const itemsWithImageSizes = await Promise.all(
    data.map(async (item: any) => {
      const imageWithSize = {
        url: `http://biografoimaginario.com:8888${JSON.parse(item.images)[0]}`,
        size: await probe(`http://biografoimaginario.com:8888${JSON.parse(item.images)[0]}`),
      }
      item.imageWithSize = imageWithSize;
      return item;
    })
  );

  return {
    props: {
      items: itemsWithImageSizes,
    }
  }
}

const HomePage = ({ items }: any) => {
    return <VideoRecorder></VideoRecorder>
}

export default HomePage;
