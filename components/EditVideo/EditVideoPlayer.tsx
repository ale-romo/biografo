import Link from 'next/link';
import styles from './EditVideoPlayer.module.css';


import { useState, useRef, useCallback, useEffect, SetStateAction } from 'react';



interface Props {
    source?: string,
    timeStart: number,
    timeEnd: number,


}

const EditVideoPlayer = ({ source, timeStart, timeEnd }:Props) => {
    const videoRef = useRef(null)
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
      (videoRef.current as any).currentTime = timeStart;
      console.log('Donasdfasdfasdfe!')
    }, [])

    const handleTimeUpdate = useCallback( () => {
      if((videoRef.current as any).currentTime > timeEnd){
        if(videoRef.current){
          (videoRef.current as any).pause()
        }
        setIsFinished(true);
      }
    },[isFinished, setIsFinished]);

    let video = <video autoPlay={false} controls={false} muted={false} onTimeUpdate={handleTimeUpdate} ref={videoRef} src={source} className={styles.editVideoPlayer}>
    </video>

    return video
  }
  
  export default EditVideoPlayer;
  