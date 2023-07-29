import { NextPage } from "next";
import CardC from 'components/Cards/CardC';
import { useEffect, useState, useRef } from 'react';
import { SectionWrapper } from "components/TextFormats/TextFormats";

export const getStaticProps = async () => {
  const videoRes: any = await fetch(`https://biografoimaginario.com:8888/getAllVideos`);
  const videoData = await videoRes.json();
  let videos;

  if(videoData.length == 0){
    videos = {error: 'No se encontró el objeto que buscas'}
  } else {
    videos = videoData;
  }


  return {
    props: {
      videos: videos
    }
  }
}

const Objetos: NextPage = ({videos}:any) => {
  const [sortMode, setSortMode] = useState('reverseChronological');

  function handleSelectChange(e:Event){
    if(e) setSortMode(e.target.value);
  }

  function sortVideos(videos: any){
    switch(sortMode){
        case 'title':
            videos.sort((a:any,b:any)=>{
                return a.title.localeCompare(b.title);
            })
        break;
        case 'chronological':
            videos.sort((a:any,b:any) => {
                return a.videoID > b.videoID? 1: -1;
            });
        break;
        case 'reverseTitle':
            videos.sort((a:any,b:any) => {
                return b.title.localeCompare(a.title);
            });
        break;
        case 'reverseChronological':
            videos.sort((a:any,b:any) => {
                return b.videoID > a.videoID? 1: -1;
            });
        break;
    }
    return videos;
  }

  function filterObjects(videos:any){
    return videos;
  }

  videos = sortVideos(videos);

  let cards = [];
  for(let video of videos){
    cards.push({src:`https://biografoimaginario.com:8888/thumbs${video.videoURL.replace('.mp4', '.png')}`, 
    title:video.title, description:video.description, action:() => { window.location.href = `/video/${video.videoID}`}})
  }
  return <SectionWrapper style={{ width: "100vw", maxWidth: "1700px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
        <select onChange={handleSelectChange}>
            <option value='reverseChronological' selected>Más Reciente Primero</option>
            <option value='chronological'>Menos Reciente Primero</option>
            <option value='title'>Órden Alfabético</option>
            <option value='reverseTitle'>Órden Reverso Alfabético</option>
        </select>
        <div id='videosContainer'>
        <style>{`#videosContainer{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }`}</style>
        {cards.map((input, index) => {
        return <div key={index}><CardC src={input.src} title={input.title} description={input.description} isVideo={true} action={input.action}></CardC></div>
        })}
    </div>
  </SectionWrapper>
};

export default Objetos;
