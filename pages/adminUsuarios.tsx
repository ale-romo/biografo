import { NextPage } from "next";

import Form from 'components/Admin/Form';


export const getStaticProps = async () => {
  const userRes: any = await fetch(`https://biografoimaginario.com:8888/secretGetUserList112355335425`);
  const userData = await userRes.json();

  return {
    props: {
      users: userData
    }
  }
}

const AdminObjetos: NextPage = ({users}: any) => {

    if(typeof users === 'undefined'){
      return <p>Cargando ... </p>
    } 
    let forms = [];
    
    for(let item of users){
        let form = <Form updateAction='/' deleteAction='/' method='POST' item={item} users={users} id={item.id} videos={[]}></Form>
        forms.push(form);
    }
    return <>
        {forms.map((form) => {
            return form;
        })}
    </>
  };
  
  export default AdminObjetos;
  