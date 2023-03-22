import { NextPage } from "next";

import Form from 'components/Admin/Form';
import { LargeText } from 'components/TextFormats/TextFormats';
import Button from "components/Button/Button";

export const getStaticProps = async () => {
  const itemRes: any = await fetch(`https://biografoimaginario.com:8888/getAllObjects`);
  const userRes: any = await fetch(`https://biografoimaginario.com:8888/secretGetUserList112355335425`);
  const videoRes: any = await fetch(`https://biografoimaginario.com:8888/getAllVideos`);
  const itemData = await itemRes.json();
  const userData = await userRes.json();
  const videoData = await videoRes.json();
  let items;

  if(itemData.length == 0){
    items = {error: 'No se encontró el objeto que buscas'}
  } else {
    items = itemData;
  }

  let users: {[id: string] : string} = {};
  for(let user of userData){
    let userid = user.id as string;
    users[userid] = user.username;
  }

  let videos: {[id: string] : string} = {};
  for(let video of videoData){
    let videoid = video.videoID as string;
    videos[videoid] = video.title;
  }

  return {
    props: {
      items: items,
      users: users,
      videos: videos
    }
  }
}

const AdminObjetos: NextPage = ({items, users, videos}: any) => {

    if(typeof items === 'undefined'){
      return <p>Cargando ... </p>
    } 
    let forms = [];
    for(let item of items){
        let changeKeysToUsernameArray = ['soldUserID', 'offeringUserID'];
        let changeKeysToVideoTitleArray = ['soldVideoID'];

        for(let key in item){
            if(changeKeysToUsernameArray.includes(key)){
                if(item[key] == '-1'){item[key.replace('ID', 'name')] = ""; } else 
                {item[key.replace('ID', 'name')] = users[item[key]];}
                delete item[key];
            }
            if(changeKeysToVideoTitleArray.includes(key)){
                if(item[key] == '-1'){item[key.replace('ID', 'Title')] = "_Sin__Venderse_ [09q3u4n91237n4-0127b3408"; } else 
                {item[key.replace('ID', 'Title')] = videos[item[key]];}
                delete item[key];
            }
            if(key == 'images'){
                delete item[key];
            }
        }
        let form = <Form updateAction='https://biografoimaginario.com:8888/secretLiaUpdateItem112355335425' 
          deleteAction='https://biografoimaginario.com:8888/secretLiaDeleteItem112355335425' 
          method='POST' 
          item={item} users={users} id={item.objectID} videos={videos} objects={[]} 
          key={`form${item.objectID}`}></Form>
        forms.push(form);
    }
    return <>
      <iframe name='decoy' style={{visibility:'hidden', height: '10px'}}></iframe>
        {forms.map((form) => {
            return form;
        })}
    </>
  };
  
  export default AdminObjetos;
  