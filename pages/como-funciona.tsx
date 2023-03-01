import { NextPage } from "next";
import { SectionWrapper } from 'components/TextFormats/TextFormats';

const ComoFunciona: NextPage = () => {
  return <SectionWrapper>
    <ul>
      <li>
        <p>elegís un objeto del autor en coonstrucción</p>
      </li>
      <li>
        <p>podés inventarlo o recordar algo que quieras inventar</p>
        <p>a partir de este objeto creas un recuerdo</p>
      </li>
      <li>
        <p>click en compra ya automáticamente se activará tu webcam</p>
      </li>
      <li>
        <p>le contás al autor en construcción su nuevo recuerdo</p>
      </li>
      <li>
        <p>el objeto ya es tuyo</p>
      </li>
      <li>
        <p>entre todos hacemos una película sobre la memoria</p>
      </li>
    </ul>
    <p>
      El recuerdo que imaginas tiene que incluir al objeto elegido y a tí con el pasadoo del autor en construcción. Esta historia será un nuevo recuerdo compartido entre ustedes.
      Puede tener cualquier forma, carácter o tono.
      ¡Tal como te guste se integrará a su memoria!
    </p>
    <p>
      Para realizar la oferta tienes que contar con el recuerdo inventado en cámara en segunda persona (es decir, de vos, de tú o de usted) como si te estuvieras dirigiendo directamente al autor en construcción, recordándole la situación que vivieron juntos.
    </p>
  </SectionWrapper>
};

export default ComoFunciona;
