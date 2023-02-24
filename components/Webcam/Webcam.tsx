import Webcam from 'react-webcam';
import { useState, useRef, useCallback, SetStateAction } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Button from 'components/Button/Button';
import { useFetch } from 'lib/hooks/useFetch';

const Wrapper = styled.div`
  video {
    max-width: 100%;
  }
`;

const VideoRecorder = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [screenshot, setScreenshot] = useState(null);

  // Photo

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
      }).then(() =>  {alert('Video subido exitosamente.')})
      setRecordedChunks([]);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setCapturing(false);
      }
    }
  }, [recordedChunks, mediaRecorderRef, setCapturing]);

  return <Wrapper>
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      audio={true}
      videoConstraints={{facingMode: 'user', }}
    />
    {capturing ? (
      <Button action={handleStopCaptureClick}>Finalizar Grabación</Button>
    ) : (
      <>
        <Button action={handleStartCaptureClick}>Grabar</Button>
        {recordedChunks.length > 0 && (
          <Button action={handleUpload}>Subir Video</Button>
        )}
      </>
    )}
    <br />
    {/* <Button action={captureScreenshot}>Take photo</Button>
    {screenshot &&
      <Image src={screenshot} alt="test" width={400} height="280"/>
    } */}
  </Wrapper>
};

export default VideoRecorder;
