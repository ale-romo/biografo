import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import Carousel from 'components/Carousel/Carousel';
import Modal from 'components/Modal/Modal';
import Card from 'components/Cards/CardB';
import CardC from 'components/Cards/CardC';
import Sticker from 'components/Sticker/Sticker';

import { useEffect } from 'react';

import {
  NegativeText,
  LargeText,
  SectionWrapper,
  Link1,
} from 'components/TextFormats/TextFormats';

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

const Landing = () => {
	return <div style={{width: "100vw", height: "100vw", position:"fixed", zIndex: "1000", background: "white", marginTop: "-48px"}}>
		<div style={{padding: "13.5% 0 0 50%"}}>
			<a href="biografoImaginario.pdf" style={{textDecoration:"underline", fontWeight: "700"}}>> dossier</a><br style={{marginBottom: "3.5%"}}/>
			<a href="biografoImaginario.pdf" style={{textDecoration:"underline", fontWeight: "700"}}>> prensa - textos conceptuales</a><br style={{marginBottom: "3.5%"}}/>
			<a href="biografoImaginario.pdf" style={{textDecoration:"underline", fontWeight: "700"}}>> fotos - diseños</a><br style={{marginBottom: "3.5%"}}/>
			<a href="biografoImaginario.pdf" style={{textDecoration:"underline", fontWeight: "700"}}>> diseño gráfico de la web</a><br style={{marginBottom: "3.5%"}}/>
			<a href="biografoImaginario.pdf" style={{textDecoration:"underline", fontWeight: "700"}}>> equipo</a><br style={{marginBottom: "3.5%"}}/>
			<a href="/" style={{textDecoration:"underline", fontWeight: "700"}}>> prototipo de la web en desarrollo</a><br style={{marginBottom: "3.5%"}}/><br style={{marginBottom: "3.5%"}}/>
      <p>biografoimaginario@gmail.com</p>
		</div>
	</div>;
}
export default Landing;