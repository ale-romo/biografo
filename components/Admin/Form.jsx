import styled, {css} from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
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
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [formFields, setFormFields] = useState({})
    useEffect(() => {
        setFormFields(inputValues);
    }, []);

    function handleChange(fieldName, event){
        let ans = formFields;
        ans[fieldName] = event.target.value;
        setFormFields(ans);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log("Data: ", formFields);
        fetch(updateAction, {
            method: 'POST',
            headers: {
                "Content-Type":'application/json',
            },
            body: JSON.stringify(formFields),
        }).then(
            () => {
                alert(`Elemento con ID #${id} actualizado.`);
            }
        )
    }

    const handleDelete = useCallback( () => {
        fetch(`${deleteAction}?id=${id}`, {
            method: 'GET',
          }).then(() =>  {
            alert(`Elemento con ID #${id} eliminado.`);
            location.reload();
        })
    },[ID, setID]);

    const handleToConfirm = useCallback( () => {
        setConfirmDelete(true);
    },[confirmDelete, setConfirmDelete]);

    let inputs = [];
    let inputValues = {id: id};
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
                case 'vObjectID':
                    name = 'objectID';
                    break;
            }
            let options = [];
            if(fieldName === 'vObjectID'){
                for (let object in objects){
                    if(objects[object] == item[fieldName]){
                        options.push(<option value={object} selected>{`${object}. ${objects[object]}`}</option>)
                        inputValues[name] = object;
                    } else {
                        options.push(<option value={object}>{`${object}. ${objects[object]}`}</option>)
                    }
                }
            } else {
                if(fieldName === 'soldUsername'){
                    if(item[fieldName]==''){
                        inputValues[name] = '-1';
                        options.push(<option value={-1} selected>Sin venderse</option>);
                    } else { 
                        options.push(<option value={-1}>Sin venderse</option>);
                    }
                }
                for (let user in users){
                    if(users[user] == item[fieldName]){
                        options.push(<option value={user} selected>{`${user}. ${users[user]}`}</option>)
                        inputValues[name] = user;
                } else {
                        options.push(<option value={user}>{`${user}. ${users[user]}`}</option>)
                    }
                }
            }

            inputs.push(<div className={styles.fieldsDiv} >
                <label>{fieldName.replace('name', 'ID')}</label>
                <select  name={name} onChange={(e) => handleChange(fieldName.replace('name', 'ID'), e)}>
                    {options.map((option) => {return <>{option}</>})}
                </select>
            </div>);
        } else if (fieldName === 'soldVideoTitle'){
            let options = [];
            if(item[fieldName].includes('_Sin__Venderse_')){
                inputValues['soldVideoID'] = '-1';
                options.push(<option value={-1} selected>Sin venderse</option>);
            } else { 
                options.push(<option value={-1}>Sin venderse</option>);
            }
            for (let video in videos){
                if(videos[video] == item[fieldName]){
                    inputValues['soldVideoID'] = video;
                    options.push(<option value={video} selected>{`${video}. ${videos[video]}`}</option>)
                } else {
                    options.push(<option value={video} >{`${video}. ${videos[video]}`}</option>)
                }
            }
            inputs.push(<div className={styles.fieldsDiv} >
                <label>{'soldVideoID'}</label>
                <select  name='soldVideoID' onChange={(e) => handleChange('soldVideoID', e)}>
                    {options.map((option) => {return <>{option}</>})}
                </select>
            </div>);
        } else if (fieldName === 'vObjectID') {
            let options = [];
            for (let object in objects){
                if(object == item[fieldName]){
                    options.push(<option  value={object} selected>{`${object}. ${objects[object]}`}</option>)
                } else {
                    options.push(<option  value={object} >{`${object}. ${objects[object]}`}</option>)
                }
            }
            inputValues[fieldName] = item[fieldName];
            inputs.push(<div className={styles.fieldsDiv} >
                <label>{fieldName}</label>
                <select  name='objectID' onChange={(e) => handleChange(fieldName, e)}>
                    {options.map((option) => {return <>{option}</>})}
                </select>
            </div>);
        } else{
            inputValues[fieldName] = item[fieldName];
            inputs.push(<div className={styles.fieldsDiv} >
                <label>{fieldName}</label>
                <input type={type} name={fieldName} defaultValue={item[fieldName]} disabled={fieldName.includes('ID')} onChange={(e) => handleChange(fieldName, e)}></input>
            </div>);
        }

    }
    return <>
        <form action={updateAction} method={method} className='formsDiv' target='decoy'> 
            <>
            <input type='hidden' name='id' value={id}></input>
            {inputs.map((input,index) => {return <div key={index}> {input}</div>})}
            <div className={styles.buttonsDiv}><button className={styles.linkButton} onClick={handleSubmit}>Actualizar</button>
                {!confirmDelete?<button className={styles.linkButtonWarning} onClick={handleToConfirm} type='button'>Borrar</button>:<></>}
                {confirmDelete?<button className={styles.linkButtonWarning} onClick={handleDelete} type='button'>Confirmación: Borrar</button>:<></>}
            </div>
            </>
        </form>
        <hr />
    </>
}
  
  export default Form;