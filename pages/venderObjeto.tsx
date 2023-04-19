import { NextPage } from "next";
import { LoginContext } from "components/User/userContext";
import { useContext} from "react";

const subirObjeto: NextPage = () => {
  let user = useContext(LoginContext);
  return <>
  <form method="POST" action="https://biografoimaginario.com:8888/sell" encType="multipart/form-data">
    <input type="hidden" name="uid" value={user.userId} required={true}/>
    <label htmlFor="name">Nombre del objeto</label><input type="text" name="name" placeholder='Nombre del Objeto'  required={true}/><br/>
    <label htmlFor="description">Descripción del objeto</label><input type="text" name="description" placeholder='Descripción del Objeto'  required={true}/><br/>
    <label htmlFor="story">Historia del objeto</label><input type="text" name="story" placeholder='Historia del Objeto'  required={true}/><br/>
    <div>
      <input type='radio' name='isAuction' value='true'/><label>Subasta</label>
      <input type='radio' name='isAuction' value='false'/><label>Venta Inmediata</label>
    </div><br/>

    <label htmlFor="endDate">Fecha cuando acaba la subasta (ignorar si no es subasta)</label><input type='date' name='endDate'  required={true}
    defaultValue='2023-05-01' min='2023-05-01' max='2024-01-01'/><br/>
    <label htmlFor='image'>Imagenes:  </label><input type='file' name='image'/><br/><br/>
    <button>Vender Objeto</button>
  </form>
  </>
};

export default subirObjeto;
