import probe from 'probe-image-size';

import VideoRecorder from 'components/Webcam/Webcam'
import { LargeText } from 'components/TextFormats/TextFormats';
import {GetStaticProps} from 'next';
import * as d3 from 'd3';
import {useState} from 'react';
import EditVideoPlayer from 'components/EditVideo/EditVideoPlayer';
import EditVideoSetter from 'components/EditVideo/EditVideoSetter';
import { SectionWrapper } from 'components/TextFormats/TextFormats';
// CONSTANTS //
const MIN_OCCURRENCES = 12;
const MIN_WORD_LENGTH = 8;
const MIN_TIME_LENGTH = 15;
class PhraseNode {
  public phrase: string;
  public videoURL: string;
  public timeStart: number;
  public timeEnd: number;
  public child: any;
  public parent: any;
  public wordLength: number;
  public timeLength: number;
  
    constructor(phrase:string, videoURL:string, timeStart:number, timeEnd:number, child=null, parent=null){
        this.phrase = phrase;
        this.wordLength = phrase.split(' ').length;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.timeLength = timeEnd - timeStart;
        this.videoURL = videoURL;
        this.parent = parent;
        this.child = child;
    }
}

class WordNode{
  public word: string;
  public WordNodeParents: any;
  public WordNodeChildren: any;
  public PhraseNodes: any;
    constructor(word:string, PhraseNodes=[]){
        this.WordNodeParents = null;
        this.WordNodeChildren = null;
        this.PhraseNodes = PhraseNodes;
        this.word = word;
    }
    addPhraseNode(PhraseNode:PhraseNode){
        this.PhraseNodes.push(PhraseNode);
    }
    getNumberOfChildrenWithWord(word:string){
        let count = 0;
        for(let PN of this.PhraseNodes){
            if(PN.child == word) count++;
        }
        return count;
    }
    getChildrenWithWord(word:string){
        if((!!word) && this.WordNodeChildren.includes(word)){
            let ans = [];
            for(let pn of this.PhraseNodes){
                if(pn.child == word){
                    ans.push(pn);
                }
            }
            return ans;
        }
        return [];
    }
    wordInChildren(word:string){
        for(let child of this.WordNodeChildren){
            if(child.word == word){
                return child;
            }
        }
        return null;
    }
    wordInParents(word:string){
        for(let parent of this.WordNodeParents){
            if(parent.word == word){
                return parent;
            }
        }
        return null;
    }
    addChild(word:string){
        if(! word){
            return;
        }
        if(! this.WordNodeChildren){
            this.WordNodeChildren = [];
        }
        if(this.WordNodeChildren.includes(word)){
            return;
        }
        this.WordNodeChildren.push(word);
    }
    addParent(word:string){
        if(! word){
            return;
        }
        if(! this.WordNodeParents){
            this.WordNodeParents = [];
        }
        if(this.WordNodeParents.includes(word)){
            return;
        }
        this.WordNodeParents.push(word);
    }
    static fromJSON(json:string){
      let obj = JSON.parse(json);
      let temp = new WordNode(obj.word);
      for(let pn of obj.PhraseNodes){
        temp.addPhraseNode(new PhraseNode(pn.phrase, pn.videoURL, pn.timeStart, pn.timeEnd, pn.child, pn.parent));
      }
      if(!!obj.WordNodeChildren)
      for(let word of obj.WordNodeChildren){
        temp.addChild(word);
      }
      if(!!obj.WordNodeParent)
      for(let word of obj.WordNodeParent){
        temp.addParent(word);
      }
      return temp;
    }
}

function addToWordNodes(word:string, lastWord:any, nextWord:any, phrase:string, videoURL:string, timeStart:number, timeEnd:number){
    let pn = new PhraseNode(phrase, videoURL, timeStart, timeEnd, lastWord, nextWord);
    if(!(word in WordNodes)){
        WordNodes[word] = new WordNode(word);
    }
    WordNodes[word].addPhraseNode(pn);
    if(!!lastWord){
        WordNodes[word].addParent(lastWord);
    }
    if(!!nextWord){
        WordNodes[word].addChild(lastWord);
    }
}

interface WordNodesObject {
  [key: string] : any;
}

interface WordMapObject{
  [key:string] : number;
}

interface Props{
  WordNodes: WordNodesObject,
}

var WordNodes:WordNodesObject = {}
var stopwords = ['sé','a','día','días','dijiste','acuerdo','acuerdas','acordás','actualmente','adelante','además','afirmó','agregó','ahora','ahí','al','algo','alguna','algunas','alguno','algunos','algún','alrededor','ambos','ampleamos','ante','anterior','antes','apenas','aproximadamente','aquel','aquellas','aquellos','aqui','aquí','arriba','aseguró','así','atras','aunque','ayer','añadió','aún','bajo','bastante','bien','buen','buena','buenas','bueno','buenos','cada','casi','cerca','cierta','ciertas','cierto','ciertos','cinco','comentó','como','con','conocer','conseguimos','conseguir','considera','consideró','consigo','consigue','consiguen','consigues','contra','cosas','creo','cual','cuales','cualquier','cuando','cuanto','cuatro','cuenta','cómo','da','dado','dan','dar','de','debe','deben','debido','decir','dejó','del','demás','dentro','desde','después','dice','dicen','dicho','dieron','diferente','diferentes','dijeron','dijo','dio','donde','dos','durante','e','ejemplo','el','ella','ellas','ello','ellos','embargo','empleais','emplean','emplear','empleas','empleo','en','encima','encuentra','entonces','entre','era','erais','eramos','eran','eras','eres','es','esa','esas','ese','eso','esos','esta','estaba','estabais','estaban','estabas','estad','estada','estadas','estado','estados','estais','estamos','estan','estando','estar','estaremos','estará','estarán','estarás','estaré','estaréis','estaría','estaríais','estaríamos','estarían','estarías','estas','este','estemos','esto','estos','estoy','estuve','estuviera','estuvierais','estuvieran','estuvieras','estuvieron','estuviese','estuvieseis','estuviesen','estuvieses','estuvimos','estuviste','estuvisteis','estuviéramos','estuviésemos','estuvo','está','estábamos','estáis','están','estás','esté','estéis','estén','estés','ex','existe','existen','explicó','expresó','fin','fue','fuera','fuerais','fueran','fueras','fueron','fuese','fueseis','fuesen','fueses','fui','fuimos','fuiste','fuisteis','fuéramos','fuésemos','gran','grandes','gueno','ha','haber','habida','habidas','habido','habidos','habiendo','habremos','habrá','habrán','habrás','habré','habréis','habría','habríais','habríamos','habrían','habrías','habéis','había','habíais','habíamos','habían','habías','hace','haceis','hacemos','hacen','hacer','hacerlo','haces','hacia','haciendo','hago','han','has','hasta','hay','haya','hayamos','hayan','hayas','hayáis','he','hecho','hemos','hicieron','hizo','hoy','hube','hubiera','hubierais','hubieran','hubieras','hubieron','hubiese','hubieseis','hubiesen','hubieses','hubimos','hubiste','hubisteis','hubiéramos','hubiésemos','hubo','igual','incluso','indicó','informó','intenta','intentais','intentamos','intentan','intentar','intentas','intento','ir','junto','la','lado','largo','las','le','les','llegó','lleva','llevar','lo','los','luego','lugar','manera','manifestó','mayor','me','mediante','mejor','mencionó','menos','mi','mientras','mio','mis','misma','mismas','mismo','mismos','modo','momento','mucha','muchas','mucho','muchos','muy','más','mí','mía','mías','mío','míos','nada','nadie','ni','ninguna','ningunas','ninguno','ningunos','ningún','no','nos','nosotras','nosotros','nuestra','nuestras','nuestro','nuestros','nueva','nuevas','nuevo','nuevos','nunca','o','ocho','os','otra','otras','otro','otros','para','parece','parte','partir','pasada','pasado','pero','pesar','poca','pocas','poco','pocos','podeis','podemos','poder','podria','podriais','podriamos','podrian','podrias','podrá','podrán','podría','podrían','poner','por','por qué','porque','posible','primer','primera','primero','primeros','principalmente','propia','propias','propio','propios','próximo','próximos','pudo','pueda','puede','pueden','puedo','pues','que','quedó','queremos','quien','quienes','quiere','quién','qué','realizado','realizar','realizó','respecto','sabe','sabeis','sabemos','saben','saber','sabes','se','sea','seamos','sean','seas','segunda','segundo','según','seis','ser','seremos','será','serán','serás','seré','seréis','sería','seríais','seríamos','serían','serías','seáis','señaló','si','sido','siempre','siendo','siete','sigue','siguiente','sin','sino','sobre','sois','sola','solamente','solas','solo','solos','somos','son','soy','su','sus','suya','suyas','suyo','suyos','sí','sólo','tal','también','tampoco','tan','tanto','te','tendremos','tendrá','tendrán','tendrás','tendré','tendréis','tendría','tendríais','tendríamos','tendrían','tendrías','tened','teneis','tenemos','tener','tenga','tengamos','tengan','tengas','tengo','tengáis','tenida','tenidas','tenido','tenidos','teniendo','tenéis','tenía','teníais','teníamos','tenían','tenías','tercera','ti','tiempo','tiene','tienen','tienes','toda','todas','todavía','todo','todos','total','trabaja','trabajais','trabajamos','trabajan','trabajar','trabajas','trabajo','tras','trata','través','tres','tu','tus','tuve','tuviera','tuvierais','tuvieran','tuvieras','tuvieron','tuviese','tuvieseis','tuviesen','tuvieses','tuvimos','tuviste','tuvisteis','tuviéramos','tuviésemos','tuvo','tuya','tuyas','tuyo','tuyos','tú','ultimo','un','una','unas','uno','unos','usa','usais','usamos','usan','usar','usas','uso','usted','va','vais','valor','vamos','van','varias','varios','vaya','veces','ver','verdad','verdadera','verdadero','vez','vosotras','vosotros','voy','vuestra','vuestras','vuestro','vuestros','y','ya','yo','él','éramos','ésta','éstas','éste','éstos','última','últimas','último','últimos', 'vos', 'tipo'];
var wordMap:WordMapObject = {}

export const getStaticProps: GetStaticProps<Props> = async() => {
  // const [desiredPossibilities, setdesiredPossibilities] = useState([]);
  
  let res = await fetch('https://biografoimaginario.com:8888/getAllVideos');
  let data = await res.json();
  let videos = data

  // function handleSetterChange(value){
  //   this.setState({desiredPossibilities:value});
  // }

  for(let video of videos){
    video['transcription'] = JSON.parse(video['transcription'])
    for(let i = 0; i < video['transcription'].length; i++){
        video['transcription'][i]['word'] = video['transcription'][i]['word'].toLowerCase()
    }
    let transcription = video['transcription']
    for(let i = 0; i < transcription.length; i++){
        if(stopwords.includes(transcription[i]['word'])){
            continue;
        } else {
            if(transcription[i]['word'] in wordMap){
                wordMap[transcription[i]['word']] += 1;
            } else {
                wordMap[transcription[i]['word']] = 1;
            }
        }
    }
  }
  for(let key in wordMap){
      if(wordMap[key] < MIN_OCCURRENCES){
          delete wordMap[key];
      }
  }
  for(let video of videos){
      if(video['transcription'].length == 0){
          continue;
      }
      let transcription = video['transcription'];
      let word = transcription[0]['word'];
      let phrase = word;
      let lastWord = null;
      let timeStart = transcription[0]['startTime'];
      for(let i = 1; i < transcription.length; i++){
          while((i >= transcription.length) || !(transcription[i]['word'] in wordMap)){
              if(i >= transcription.length){
              addToWordNodes(word, lastWord, null, phrase, video['videoURL'], timeStart, transcription[i-1]['endTime']);
              break;
              }
              phrase += ' ' + transcription[i]['word'];
              i++;
          }
          if(i == transcription.length){
              break;
          }
          if(transcription[i]['endTime'] - timeStart < MIN_TIME_LENGTH ){
              phrase += ' ' + transcription[i]['word'];
              continue;
          }
          if(phrase.split(' ').length < MIN_WORD_LENGTH){
              phrase += ' ' + transcription[i]['word'];
              continue;
          }
          addToWordNodes(word, lastWord, transcription[i].word, phrase, video['videoURL'], timeStart, transcription[i-1]['endTime']);
          lastWord = word;
          word = transcription[i]['word'];
          phrase = word;
          timeStart = transcription[i]['startTime'];
      }
  }
  for(let key in WordNodes){
    WordNodes[key] = JSON.stringify(WordNodes[key]);
  }
  return {
    props: {
      WordNodes: WordNodes,
    }
  }
}

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

const HomePage = ({WordNodes}:Props) => {
  let words:WordMapObject = {};
  for(let key in WordNodes){
    if(typeof(WordNodes[key] == 'string') && typeof(window) == 'undefined') {
      WordNodes[key] = WordNode.fromJSON(WordNodes[key]);
    }
  }
  for(let key in WordNodes){
    if(!!WordNodes[key].WordNodeChildren)
    for(let w of WordNodes[key].WordNodeChildren){
      if(w in words){
        words[w] += 1;
      } else {
        words[w] = 1;
      }
    }
  }
  let ans = [];
  for(let key in words){
    ans.push({text: key, value: words[key]})
  }
  console.log(ans)
  // console.log(WordNodes);
  // console.log(WordNodes);
  return <SectionWrapper style={{ width: "100vw", maxWidth: "1700px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
    <EditVideoSetter words={ans} callback={() => {}}></EditVideoSetter>
    <EditVideoPlayer source='https://biografoimaginario.com:8888/uploads/9/3/5/f/2f40-a426-4444-a079-509d36843dc3.mp4' timeEnd={2.2} timeStart={1}></EditVideoPlayer>
  </SectionWrapper>
}

export default HomePage;
