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

  let items: {[id: string] : string} = {};

  for(let item of itemData){
    let itemid = item.objectID as string;
    items[itemid] = item.title;
  }



  let users: {[id: string] : string} = {};
  for(let user of userData){
    let userid = user.id as string;
    users[userid] = user.username;
  }

  let videos = videoData;

  return {
    props: {
      items: items,
      users: users,
      videos: videos
    }
  }
}

const AdminObjetos: NextPage = ({items, users, videos}: any) => {

    if(typeof videos === 'undefined'){
      return <p>Cargando ... </p>
    } 
    let forms = [];
    for(let item of videos){
        let changeKeysToUsernameArray = ['soldUserID', 'offeringUserID', 'userID'];
        let keysToDelete = ['isTranscripted', 'isEncoded', 'videoURL', 'tempURL', 'transcription']

        for(let key in item){
            if(changeKeysToUsernameArray.includes(key)){
                if(item[key] == '-1'){item[key.replace('ID', 'name')] = ""; } else 
                {item[key.replace('ID', 'name')] = users[item[key]];}
                delete item[key];
            }
            if(key === 'objectID'){
                item['vObjectID'] = item[key] as string;
                delete item[key];
            }
            if(keysToDelete.includes(key)){
                delete item[key];
            }
        }
        let form = <Form updateAction='/secretLiaUpdateVideo112355335425' deleteAction='/secretLiaRemoveItem112355335425' method='POST' item={item} users={users} id={item.objectID} videos={videos} objects={items}></Form>
        forms.push(form);
    }
    return <>
        {forms.map((form) => {
            return form;
        })}
    </>
  };
  
  export default AdminObjetos;
  