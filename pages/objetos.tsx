import { NextPage } from "next";
import CardC from 'components/Cards/CardC';
import { useEffect, useState, useRef } from 'react';


export const getStaticProps = async () => {
  const itemRes: any = await fetch(`https://biografoimaginario.com:8888/getAllObjects`);
  const itemData = await itemRes.json();
  let items;

  if(itemData.length == 0){
    items = {error: 'No se encontró el objeto que buscas'}
  } else {
    items = itemData;
  }


  return {
    props: {
      items: items
    }
  }
}

const Objetos: NextPage = ({items}:any) => {
  const [sortMode, setSortMode] = useState('reverseChronological');
  function handleSelectChange(e:Event){
    if(e) setSortMode(e.target.value);
  }
  function filterObjects(items:any){
    return items;
  }
  function sortItems(items:any){
    switch(sortMode){
      case 'title':
          items.sort((a:any,b:any)=>{
              return a.title.localeCompare(b.title);
          })
      break;
      case 'chronological':
        items.sort((a:any,b:any) => {
              return a.objectID > b.objectID? 1: -1;
          });
      break;
      case 'reverseTitle':
        items.sort((a:any,b:any) => {
              return b.title.localeCompare(a.title);
          });
      break;
      case 'reverseChronological':
        items.sort((a:any,b:any) => {
              return b.objectID > a.objectID? 1: -1;
          });
      break;
      }
    return items;
  }

  items = sortItems(items);
  let cards = [];
  for(let item of items){
    cards.push({src:`https://biografoimaginario.com:8888/${JSON.parse(item.images)[0]}`, title:item.title, description:item.description, sold:item.soldVideoID!='-1', action:`/objeto/${item.objectID}`})
  }
  return <>
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
          return <div key={index}><CardC src={input.src} title={input.title} description={input.description} sold={input.sold} action={input.action}></CardC></div>
        })}
    </div>
  </>
};

export default Objetos;
