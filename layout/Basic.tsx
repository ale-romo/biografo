const IS_IN_DEV_MODE = true;

import styled, { createGlobalStyle } from "styled-components";
import Nav from "components/Nav/Nav";
import OpenOnce from "components/OpenOnce/OpenOnce";
import Modal from "components/Modal/Modal"
import cookie from 'js-cookie';
import { useEffect, useState } from "react";

import {
	NegativeText,
	LargeText,
	SectionWrapper,
	Link1,
	FadingChildren
} from 'components/TextFormats/TextFormats';
import { useGlitch } from "react-powerglitch";

const COOKIENAME = '11235811';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
	h1{
		font-size: 33px;
		font-family: "futura-pt", sans-serif;
		font-weight: 700;
		font-style: normal;
	}
	h2{
		font-family: "futura-pt", sans-serif;
		font-weight: 700;
		font-style: normal;
		font-size: 22px;
	}
`;

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

const StyledHeader = styled.header`
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: ${!IS_IN_DEV_MODE ? '0' : '42px'};
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 100px);
  max-width: 1700px;
  z-index:2;
	height: 120px;
;`
const StyledContent = styled.div`
position: relative;
  margin-top: 41px;
`;

const BasicLayout = ({ children }: { children: any }) => {
	const navProps = {
		items: [
			{
				url: '/',
				title: 'Inicio',
			},
			{
				url: '/edit',
				title: 'Ver Biografia',
			},
			{
				url: '/venderObjeto',
				title: 'Vender un Objeto',
			},
			{
				url: '/videos',
				title: 'Ver Todos los Recuerdos',
			},
			{
				url: '/objetos',
				title: 'Ver Todos los Objetos',
			},
			{
				url: '/acerca',
				title: 'Acerca',
			},
			{
				url: '/como-funciona',
				title: 'Cómo funciona',
			},
			{
				url: '/faq',
				title: 'Preguntas frecuentes',
			},
			{
				url: '/contacto',
				title: 'Contáctanos',
			},
			{
				url: '/auth',
				title: 'Iniciar Sesión',
			}
		]
	}
	/**************************** */
	const [hasCookie, setCookie] = useState(false);
	const [hasFailed, setFailed] = useState(false);
	const [hasSeenLanding, setSeenLanding] = useState(false);

	useEffect(() => {
		if(!!cookie.get(COOKIENAME)){
			setCookie(true);
		}
		let keyDownHandler = (event:any) => {
			if(event && event.key === "Enter"){
				event.preventDefault();
				let text = document.querySelector("input")?.value;
				if(text && text == COOKIENAME){
					cookie.set(text, 'true', {expires:new Date(new Date().getTime() + 15 * 60 * 1000)});
					setCookie(true);
				} else {
					setFailed(true);
				}
			}
		}
		document.querySelector('input')?.addEventListener('keydown', keyDownHandler);
	},[]);
	
	if(!hasCookie){
		let validationFunction = () => {
			let text = document.querySelector("input")?.value;
			if(text && text == COOKIENAME){
				cookie.set(text, 'true', {expires:new Date(new Date().getTime() + 15 * 60 * 1000)});
				setCookie(true);
			} else {
				setFailed(true);
			}
		};
		return <div style={{width: "100vw", height: "100vh", position: "relative"}}>
		<div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)"}}>
			<div style={{position: "relative", left: "50%", transform: "translateX(-50%)", width: "fit-content"}}>
					<input type="password" placeholder="contraseña" style={{padding: "7px"}}></input> <button type="button" style={{border: "1px solid black", padding:"8px 12px", background:"white"}}
					onClick={validationFunction}>ingresar</button>
				{hasFailed && <p style={{color:"red", textAlign: "center"}}>constraseña equivocada</p>}
			</div>
			<br/>
			<p style={{textAlign:"center"}}><span style={{fontSize: "1.2rem", fontWeight: "700"}}>biografoimaginario@gmail.com</span></p>
		</div>
	</div>
	}

	if(!hasSeenLanding){
		return <div style={{width: "100vw", height: "100vw", position:"fixed", zIndex: "1000", background: "white", marginTop: "-48px"}}>
		<div style={{padding: "128px 0 0 50%"}}>
			<a href="biografoImaginario.pdf" style={{fontWeight: "700", marginBottom: "28px", display:"inline-block"}}>> dossier</a><br style={{marginBottom: "28px"}}/>
			<a href="biografoImaginario.pdf" style={{fontWeight: "700", marginBottom: "28px", display:"inline-block"}}>> prensa - textos conceptuales</a><br style={{marginBottom: "28px"}}/>
			<a href="biografoImaginario.pdf" style={{fontWeight: "700", marginBottom: "28px", display:"inline-block"}}>> fotos - diseños</a><br style={{marginBottom: "28px"}}/>
			<a href="biografoImaginario.pdf" style={{fontWeight: "700", marginBottom: "28px", display:"inline-block"}}>> diseño gráfico de la web</a><br style={{marginBottom: "28px"}}/>
			<a href="biografoImaginario.pdf" style={{fontWeight: "700", marginBottom: "28px", display:"inline-block"}}>> equipo</a><br style={{marginBottom: "28px"}}/>
			<a onClick={() => {
				setSeenLanding(true);
			}} style={{fontWeight: "700", cursor:"pointer"}}>> prototipo de la web en desarrollo</a><br style={{marginBottom: "28px"}}/><br style={{marginBottom: "28px"}}/>
      <p>biografoimaginario@gmail.com</p>
		</div>
	</div>;
	}

	/**************************** */



	return (
		<>
			<GlobalStyle />
			<link rel="stylesheet" href="https://use.typekit.net/xhf3zhn.css"></link>
			<OpenOnce cookieName='startupModal' test={false} expires={new Date(new Date().getTime() + 45 * 60 * 1000)}>
				<Modal
					isOpen={true}
					timer={20700}
					contentWidth="100vw"
					contentHeight="100vh"
					showCloseButton={true}
					zIndex={99999}
				>
					<ModalContent>
						{/* <SectionWrapper>
          <FadingChildren startTime={200} duration={14500} removeChildren={false}><LargeText style={{fontWeight: "700"}}>biógrafoImaginario</LargeText></FadingChildren>
          <FadingChildren startTime={700} duration={14500} removeChildren={false}><p style={{fontWeight: "700"}}>o proyecto automático de recambio de recuerdos propone</p></FadingChildren>
          <FadingChildren startTime={1200} duration={14500} removeChildren={false}><p>desprenderse de los objetos,</p></FadingChildren>
          <FadingChildren startTime={1700} duration={14500} removeChildren={false}><p>desprenderse de los recuerdos,</p></FadingChildren>
          <FadingChildren startTime={2200} duration={14500} removeChildren={false}><p>desprenderse de la elección del encuadre,</p></FadingChildren>
          <FadingChildren startTime={2700} duration={14500} removeChildren={false}><p>desprenderse del criterio de selección, de la edición y del punto de vista</p></FadingChildren>
          <FadingChildren startTime={3200} duration={14500} removeChildren={false}><br/></FadingChildren>
          <FadingChildren startTime={5000} duration={14500} removeChildren={false}><p style={{fontWeight: "700"}}>para crear una película autobiográfica automática</p></FadingChildren>
          </SectionWrapper> */}
						<SectionWrapper style={{ textAlign: "center" }}>
							<FadingChildren startTime={700} duration={18400} removeChildren={false}><LargeText style={{ fontWeight: "700" }}>biógrafoImaginario</LargeText></FadingChildren>
							<FadingChildren startTime={700 + 1600} duration={17000} removeChildren={false}><p style={{ fontWeight: "700" }}>o Proyecto de Recambio Automático de Recuerdos</p></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 2} duration={17000 - 1600} removeChildren={false}><p style={{ fontWeight: "700", fontSize: "22px", marginTop: "-12px" }}>propone</p></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 3} duration={200 + (1600 * 3)} removeChildren={false}><p>desprenderse de los objetos,</p></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 4} duration={200 + (1600 * 3)} removeChildren={false}><p>desprenderse de los recuerdos,</p></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 5} duration={200 + (1600 * 3)} removeChildren={false}><p>desprenderse de la elección del encuadre,</p></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 6} duration={200 + (1600 * 3)} removeChildren={false}><p>desprenderse del criterio de selección, de la edición y del punto de vista</p></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 7} duration={200 + (1600 * 3)} removeChildren={false}><br /></FadingChildren>
							<FadingChildren startTime={700 + 1600 * 7} duration={200 + (1600 * 4)} removeChildren={false}><p style={{ fontWeight: "700", fontSize: "22px" }}>para crear una película autobiográfica automática</p></FadingChildren>
						</SectionWrapper>
					</ModalContent>
				</Modal>
			</OpenOnce>
			<StyledHeader>
				<Nav {...navProps} />
				<div style={{ position: "relative", top: "50%", transform: "translateY(-50%)", height: "fit-content" }}><h2 style={{ textAlign: 'right', fontSize: "28px", letterSpacing: "-1px;" }}>biógrafoImaginario</h2><p style={{ fontSize: "15px", textAlign: "right", marginTop: "-30px", letterSpacing: "2px" }}>recambio automático de recuerdos</p></div>
			</StyledHeader>
			<div style={{height: `${IS_IN_DEV_MODE? (48+42)+'px':"48px"}`}}></div>
			{children}
			<div style={{position: "fixed", top: "0", left: "0", zIndex:"999", height: "fit-content", width: "100vw", overflow: "hidden"}}>
				<div style={{background: "red", width: "100%", textAlign: "center", margin: "0"}}><p style={{color: "white", fontWeight: "700", margin: "0"}}> &nbsp;prototipo del sitio en construcción&nbsp; </p></div>
				<a onClick={() => {
					setSeenLanding(false);
				}}><div style={{background: "red", width: "100%", textAlign: "center", cursor: "pointer", margin: "0", height: "fit-content"}}><p style={{color: "white", fontWeight: "700", margin: "0"}}> >&nbsp;home del proyecto&nbsp; </p></div></a>
			</div>
		</>
	);
};

export default BasicLayout;
