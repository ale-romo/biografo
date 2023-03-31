import probe from 'probe-image-size';

import VideoRecorder from 'components/Webcam/Webcam'
import { LargeText } from 'components/TextFormats/TextFormats';
import EditVideoPlayer from 'components/EditVideo/EditVideoPlayer';

// export const getStaticProps = async ({params}: any) => {
//   const itemRes: any = await fetch(`https://biografoimaginario.com:8888/getObjects?ID=${params.pid}`);
//   const itemData = await itemRes.json();
//   const item = itemData[0];
//   const videoRes: any =  await fetch(`https://biografoimaginario.com:8888/getVideos?ID=${1}`)
//   const video = await videoRes.json();

//   const images = JSON.parse(item.images);

//   item.imagesWithSizes = await Promise.all(
//     images.map(async (image: string) => {
//       return {
//         url: `https://biografoimaginario.com:8888/${image}`,
//         size: await probe(`https://biografoimaginario.com:8888/${image}`)
//       }
//     })
//   );

//   return {
//     props: {
//       item: item,
//       video: video,
//     }
//   }
// }

const HomePage = () => {
  return <>
    <EditVideoPlayer source='https://biografoimaginario.com:8888/uploads/9/3/5/f/2f40-a426-4444-a079-509d36843dc3.mp4' timeEnd={2.2} timeStart={1}></EditVideoPlayer>
  </>
}

export default HomePage;
