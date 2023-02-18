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
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
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

  const handleDownload = useCallback(() => {
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

      fetch('http://biografoimaginario.com:8888/upload', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return <Wrapper>
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      audio={true}
    />
    {capturing ? (
      <Button action={handleStopCaptureClick}>Stop Capture</Button>
    ) : (
      <>
        <Button action={handleStartCaptureClick}>Start Capture</Button>
        {recordedChunks.length > 0 && (
          <Button action={handleDownload}>Download</Button>
        )}
      </>
    )}
    <br />
    <Button action={captureScreenshot}>Take photo</Button>
    {screenshot &&
      <Image src={screenshot} alt="test" width={400} height="280"/>
    }
  </Wrapper>
};

export default VideoRecorder;
