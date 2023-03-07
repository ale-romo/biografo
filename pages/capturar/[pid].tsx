import { NextPage } from "next";

import VideoRecorder from 'components/Webcam/Webcam'
import { LargeText } from 'components/TextFormats/TextFormats';
import Button from "components/Button/Button";
import { LoginContext } from "components/User/userContext";
import { useContext} from "react";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async ({params}: any) => {
  const itemRes: any = await fetch(`https://biografoimaginario.com:8888/getObjects?ID=${params.pid}`);
  const itemData = await itemRes.json();
  let item;

  if(itemData.length == 0){
    item = {error: 'No se encontró el objeto que buscas'}
  } else {
    item = itemData[0];
  }

  return {
    props: {
      item: item,
      pid: params.pid,
    }
  }
}

const { userId } = useContext(LoginContext);

const UploadObjeto: NextPage = ({item, pid}: any) => {

  if(typeof item === 'undefined'){
    item = {title:'cargando...'}
  } 
  if('error' in item){
    return <div className='errorText'>
      <LargeText><b>Error:</b> No encontramos el objeto que buscas.</LargeText><br/><br/>
      <Button action={'/'}>Regresar</Button>
      <style >{`
        .errorText{
            padding: 20px 40px;
        } `
      }
      </style>
    </div>
  }
  return <>
    <div>
      <style >{`
        .titleText{
            padding: 20px 40px;
        } `
      }
      </style>
      <div className='titleText'>
        <LargeText>Mandando oferta para comprar <b>{item.title}</b></LargeText>
      </div>
      <br/>
      <VideoRecorder objectid={pid} uid={String(userId) }></VideoRecorder>
    </div>
  </>
};

export default UploadObjeto;
