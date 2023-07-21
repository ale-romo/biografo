import { NextPage } from "next";
import { SectionWrapper } from 'components/TextFormats/TextFormats';


const Faq: NextPage = () => {
  return (
    <SectionWrapper style={{ width: "100vw", maxWidth: "1200px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
      <ul>
        <li>
          <h3>
            ¿El intercambio es real?
          </h3>
          <p>
            Sí,el intercambio es real. Si tu video tiene un relato que cumple con lo pedido te damos el objeto.
          </p>
        </li>
        <li>
          <h3>
            ¿Cuánto salen los objetos?
          </h3>
          <p>
            Valen sólo un recuerdo registrado en video. El que quieras contar. Recordará que por participar estás cediendo tu imagen y tu relato para fines artísticos.
          </p>
        </li>
        <li>
          <h3>
            ¿Puedo usar mi cámara para registrar el recuerdo?
          </h3>
          <p>
            Sí, y después podés subir el video a través del link subir video en formato flv, o enviarlo en cualquier formato (vía Yousendit / Rapidshare o similares) a nuestro email: biografoimaginario@gmail.com
          </p>
        </li>
        <li>
          <h3>
            Noo  tengo cámara Web ni de video... ¿Qué hago?
          </h3>
          <p>
            Vas a un locutorio y registras tu relato.
          </p>
        </li>
        <li>
          <h3>
            ¿Por qué tengo que registrarme?
          </h3>
          <p>
            Para poder tener tus datos y contactarnos contigo, para que puedas retirar los objetos que compres.
          </p>
        </li>
        <li>
          <h3>
            ¿Cómo tengo que contar el recuerdo?
          </h3>
          <p>
            Para realizar una oferta válida hay que contar el recuerddo en segunda persona (es decir, de vos, tú o de usted), como si te estuvieras dirigiendo directamente con el autor en construcción, recordándole que vivieron juntos con el objeto.
          </p>
        </li>
      </ul>
    </SectionWrapper>
  );
}

export default Faq;
