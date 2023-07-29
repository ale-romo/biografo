import { NextPage } from "next";
import { SectionWrapper } from 'components/TextFormats/TextFormats';

const Acerca: NextPage = () => {
  return 			<SectionWrapper style={{ width: "100vw", maxWidth: "1700px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
    <h2>Biografo Imaginario</h2>
    <h2>o proyecto automático de recambio de recuerdos</h2>
    <p>
      propone<br />
      desprenderse de los objetos<br />
      desprenderse de los recuerdos<br />
      desprenderse de la elección del encuadre<br />
      desprenderse del criterio de selección, de la edición,<br />
      y del punto de vista<br />
      para la creación de automáticas películas autobiográficas.
    </p>
  </SectionWrapper>
};

export default Acerca;
