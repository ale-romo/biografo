import { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { SectionWrapper } from 'components/TextFormats/TextFormats';

const Steps = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  justify-content: space-around;
  column-gap: 40px;
`;

const ComoFunciona: NextPage = () => {
  return <SectionWrapper style={{ width: "100vw", maxWidth: "1700px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
    <Steps>
      <li>
        <Image src="/images/step1.jpg" width={572} height={905}/>
        <p>elegís un objeto del autor en coonstrucción</p>
      </li>
      <li>
        <Image src="/images/step2.jpg" width={572} height={905}/>
        <p>click en compra ya automáticamente se activará tu webcam</p>
      </li>
      <li>
        <Image src="/images/step3.jpg" width={572} height={905}/>
        <p>podés inventarl o recordar algo a partir de este objeto y le contás al autor en construcción su nuevo recuerdo</p>
      </li>
      <li>
        <Image src="/images/step4.jpg" width={572} height={905}/>
        <p>el objeto ya es tuyo</p>
      </li>
      <li>
        <img src="www.miravalresorts.com/wp-content/themes/miraval/assets/images/world-hyatt.png" />
        <p>entre todos hacemos una película sobre la memoria</p>
      </li>
    </Steps>
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
