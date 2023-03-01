import probe from 'probe-image-size';

import VideoRecorder from 'components/Webcam/Webcam'
import { LargeText } from 'components/TextFormats/TextFormats';

export const getStaticProps = async ({params}: any) => {
  const itemRes: any = await fetch(`https://biografoimaginario.com:8888/getObjects?ID=${params.pid}`);
  const itemData = await itemRes.json();
  const item = itemData[0];
  const videoRes: any =  await fetch(`https://biografoimaginario.com:8888/getVideos?ID=${1}`)
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

const HomePage = ({ items }: any) => {
  return <>
    <LargeText>Mandando oferta para comprar {data.title}</LargeText>
    <VideoRecorder objectid={'1'} uid={'1'}></VideoRecorder>
  </>
}

export default HomePage;
