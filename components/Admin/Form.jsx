import styled, {css} from 'styled-components';
import { useState, useCallback } from 'react';
import styles from './Form.module.css';

// interface Fields{
//     objectID?: string;
//     userID?: string;
//     videoID?: string;
//     messageID?: string;
//     questionID?: string;

//     description?: string;
//     isEncoded?: string;
//     isTranscripted?: string;
//     tags?: string;
//     tempURL?: string;
//     timePublished?: string;
//     title?: string;
//     transcription?: string;
//     videoURL?: string;
//     createdAt?: string;
//     isAdmin?: string;
//     password?: string;
//     salt?: string;
//     username?: string;
//     endDate?: string;
//     history?: string;
//     images?: string;
//     isAuction?: string;
//     offeringUserID?: string;
//     soldUserID?: string;
//     offeringUsername?: string;
//     soldUsername?: string;
//     soldVideoID?: string;
//     soldVideoTitle?: string;
//     answer?: string;
//     objectTitle?: string;
//     question?: string;
//     email?: string;
//     message?: string;
//     name?: string;
    
// }

// interface Props {
//     action: string;
//     method: string;
//     arrayOfFields: Fields[];
// }

const Form =({ updateAction, deleteAction, method, item, id, users, videos, objects}) => {
    const [ID, setID] = useState(id);

    const handleDelete = useCallback( () => {
        fetch(`${deleteAction}?id=${id}`, {
            method: 'GET',
          }).then(() =>  {
            alert(`Elemento con ID #${id} eliminado.`);
            location.reload();
        })
    },[ID, setID]);

    const handleUpdate = useCallback( () => {
        alert(`Elemento con ID #${id} actualizado.`);
    },[ID, setID]);

    let inputs = [];
    for(let fieldName in item){
        let specialFieldNames = {endDate: 'date', createdAt: 'date', description: 'textarea', history: 'textarea', timePublished: 'date'}
        let type = 'text';
        let dateRegex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+)/;
        if(dateRegex.test(item[fieldName])){
            item[fieldName] = item[fieldName].split('T')[0];
        }
        if (fieldName in specialFieldNames){
            type = specialFieldNames[fieldName];
        }
        if (fieldName.includes('name')){
            let name = '';
            switch(fieldName){
                case 'soldUsername':
                    name = 'soldUserID';
                    break;
                case 'offeringUsername':
                    name = 'offeringUserID';
                    break;
                case 'username':
                    name = 'userID';
                    break;
            }
            let options = [];
            if(fieldName === 'soldUsername'){
                if(item[fieldName]==''){
                    options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={-1} selected>Sin venderse</option>);
                } else { 
                    options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={-1}>Sin venderse</option>);
                }
            }
            for (let user in users){
                if(users[user] == item[fieldName]){
                    options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={user} selected>{`${user}. ${users[user]}`}</option>)
                } else {
                    options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={user}>{`${user}. ${users[user]}`}</option>)
                }
            }
            inputs.push(<div className={styles.fieldsDiv} key={`input${fieldName}.${item[fieldName]}`}>
                <label>{fieldName.replace('name', 'id')}</label>
                <select  name={name} key={`select${id}.${fieldName}`}>
                    {options.map((option) => {return <>{option}</>})}
                </select>
            </div>);
        } else if (fieldName === 'soldVideoTitle'){
            let options = [];
            if(item[fieldName] == ''){
                options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={-1} selected>Sin venderse</option>);
            } else { 
                options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={-1}>Sin venderse</option>);
            }
            for (let video in videos){
                if(videos[video] == item[fieldName]){
                    options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={video} selected>{`${video}. ${videos[video]}`}</option>)
                } else {
                    options.push(<option key={`option${fieldName}.${item[fieldName]}`} value={video} >{`${video}. ${videos[video]}`}</option>)
                }
            }
            inputs.push(<div className={styles.fieldsDiv} key={`input${fieldName}.${item[fieldName]}`}>
                <label>{fieldName}</label>
                <select  name='soldVideoID' key={`select${fieldName}.${item[fieldName]}`}>
                    {options.map((option) => {return <>{option}</>})}
                </select>
            </div>);
        } else if (fieldName === 'vObjectID') {
            let options = [];
            for (let object in objects){
                if(object == item[fieldName]){
                    options.push(<option key={`input${fieldName}.${item[fieldName]}`} value={object} selected>{`${object}. ${objects[object]}`}</option>)
                } else {
                    options.push(<option key={`input${fieldName}.${item[fieldName]}`} value={object} >{`${object}. ${objects[object]}`}</option>)
                }
            }
            inputs.push(<div className={styles.fieldsDiv} key={`input${fieldName}.${item[fieldName]}`}>
                <label>{fieldName}</label>
                <select  name='objectID' key={`select${fieldName}.${item[fieldName]}`}>
                    {options.map((option) => {return <>{option}</>})}
                </select>
            </div>);
        } else{
            inputs.push(<div className={styles.fieldsDiv} key={`input${fieldName}.${item[fieldName]}`}>
                <label>{fieldName}</label>
                <input type={type} name={fieldName} defaultValue={item[fieldName]} disabled={fieldName.includes('ID')}></input>
            </div>);
        }
    }
    return <>
        <form action={updateAction} method={method} className='formsDiv' target='decoy'> 
            <>
            <input type='hidden' name='id' value={id}></input>
            {inputs.map((input) => {return <> {input}</>})}
            <div className={styles.buttonsDiv}><button className={styles.linkButton} onClick={handleUpdate}>Actualizar</button> <button className={styles.linkButtonWarning} onClick={handleDelete} type='button'>Borrar</button></div> <hr />
            </>
        </form>
        <hr />
    </>
}
  
  export default Form;