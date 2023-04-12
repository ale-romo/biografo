import Link from 'next/link';
import styles from './EditVideoPlayer.module.css';

interface Props {
    words:any;
    callback:Function;
}



const EditVideoSetter = ({words, callback}:Props) => {
    let ans = [];
    function handleClick(word:any){
        ans.push(word);
        callback(ans);
    }

    let elements = [[null, 'Terminar']];
    for(let word of words){
        elements.push([word['text'], `${word['text']} tiene ${word['value'] + 1} posibilidades.`])
    }
    return <>
        <div>
        {elements.map((input,index) => {return <div key={index} ><button onClick={() => {handleClick(input[0])}}> {input[1]}</button><br/></div>})}
        </div>
    </>
}
  export default EditVideoSetter;
  