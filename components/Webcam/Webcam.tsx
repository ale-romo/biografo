import Webcam from 'react-webcam';
import { useState, useRef, useCallback, SetStateAction } from 'react';
import styled from 'styled-components';
import Button from 'components/Button/Button';
import {LargeText} from 'components/TextFormats/TextFormats';

import styles from './Webcam.module.css';

interface Props {
  uid: string;
  objectid:string;
}

const Wrapper = styled.div`
  video {
    max-width: 100%;
  }
`;

const VideoRecorder = ({ uid, objectid }:Props) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [screenshot, setScreenshot] = useState(null);
  const [started, setStarted] = useState(false);
  const [instructionsViewed, setInstructionsViewed] = useState(false);

  // Photo

  const handleStart = useCallback( () => {
    setStarted(true);
  },[started, setStarted]);

  const handleInstructionsViewed = useCallback( () => {
    setInstructionsViewed(true);
  },[instructionsViewed, setInstructionsViewed]);
  
  const captureScreenshot = useCallback(() => {
    if (webcamRef?.current?.getScreenshot) {
      const imageSrc: any = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
    }
  }, [webcamRef, setScreenshot]);

  // Video
  const handleDataAvailable = useCallback(
    ({ data }: {data: any}) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if(webcamRef?.current?.stream) {
      let options = {};
      if(MediaRecorder.isTypeSupported('video/webm; codecs=vp9')){
        options = {mimeType: 'video/webm; codecs=vp9'};
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        options = {mimeType: 'video/webm'};
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        options = {mimeType: 'video/mp4', videoBitsPerSecond : 100000};
      } else {
        console.error('Este dispositivo no es compatible con este sitio.')
      }
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, options);
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable,
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);



  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef,setCapturing]);

  const handleUpload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      let body = {
        title: 'title',
        description: 'description',
        uid: '1',
        objectID: '1',
        tags: JSON.stringify(['lorem','ipsum','prueba'])
      }
      let formData = new FormData();
      for (const [key, value] of Object.entries(body)){
        formData.append(key,value);
      }
      formData.append("blob", blob, 'video');
      console.log(formData)

      fetch('https://biografoimaginario.com:8888/upload', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(() =>  {alert('Video subido exitosamente.'); setRecordedChunks([]);})
    }
  }, [recordedChunks]);

  var startedDiv = <>
    <div className={styles.instructionsDiv}>
      <div>
        <p><LargeText>Instrucciones:</LargeText> <br/>
          Habla de una experiencia en la segunda persona: Tú te levantaste temprano para ver el amanecer, cuando estabas muy cansado... 
        </p>
        <Button action={handleStart}>Empezar</Button>
      </div>
    </div>
  </>
  var webcam = <>
    {(!started) && startedDiv}
    <form id={styles.form}>
      <input type='text' placeholder='título del recuerdo' name='title' id={styles.formTitle}></input><br/>
      <input type='textarea' placeholder='descripción del recuerdo' name='description' id={styles.formDescription}></input><br/>
      <input type='hidden' name='uid' id={styles.formTitle} value={uid}></input>
      <input type='hidden' name='objectID' id={styles.formTitle} value={objectid}></input>
      <input type='text' placeholder='palabras clave del recuerdo (separar con espacios o con comas).' name='tags' id={styles.formTags}></input>
    </form>
    <Webcam
      ref={webcamRef}
      audio={true}
      videoConstraints={{facingMode: 'user', }}
      muted={true}
    />
    <div className={styles.buttonDiv}>
      {capturing ? (
        <>
        <Button action={handleStopCaptureClick}>Finalizar Grabación</Button>
        </>
      ) : (
        <>
          <Button action={handleStartCaptureClick}>Grabar</Button>
          {recordedChunks.length > 0 && (
            <Button action={handleUpload}>Subir Video</Button>
          )}
        </>
      )}
      
      <div className={styles.secondaryButtonDiv}>
        <a href={`/objeto/${objectid}`} className={styles.linkButton}>Cancelar</a>
      </div>
    </div>
  </>


  return <Wrapper className={styles.webcamWrapper}>
    <div className={styles.webcamDiv}>
      {
      instructionsViewed ? webcam : 
      <>
          <LargeText>Para continuar, tienes que compartir tu webcam y tu micrófono con nosotros al dar click en Ver Instrucciones.</LargeText>
          <br/>
          <br/>
          <Button action={handleInstructionsViewed}>Ver Instrucciones</Button>
        </>
        }
    </div>
  </Wrapper>
};

export default VideoRecorder;
