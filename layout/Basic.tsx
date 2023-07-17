import styled, { createGlobalStyle } from "styled-components";
import Nav from "components/Nav/Nav";
import OpenOnce from "components/OpenOnce/OpenOnce";
import Modal from "components/Modal/Modal"
import {
  NegativeText,
  LargeText,
  SectionWrapper,
  Link1,
  FadingChildren
} from 'components/TextFormats/TextFormats';
import { useGlitch } from "react-powerglitch";

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
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
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
  const glitch = useGlitch({timing: {iterations: 1}, shake: {velocity: 12, amplitudeX: 0.4, amplitudeY:0.45}, slice: {count: 6}});
  return (
    <>
		<GlobalStyle/>
		<link rel="stylesheet" href="https://use.typekit.net/xhf3zhn.css"></link>
    <OpenOnce cookieName='startupModal' test={false}>
      <Modal
        isOpen={true}
        timer={20700}
        contentWidth="80vw"
        contentHeight="90vh"
        showCloseButton={false}
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
          <SectionWrapper style={{textAlign: "center"}}>
            <FadingChildren startTime={700} duration={18400} removeChildren={false}><LargeText style={{fontWeight: "700"}}>biógrafoImaginario</LargeText></FadingChildren>
            <FadingChildren startTime={700+1600} duration={17000} removeChildren={false}><p style={{fontWeight: "700"}}>o Proyecto de Recambio Automático de Recuerdos</p></FadingChildren>
            <FadingChildren startTime={700+1600*2} duration={17000-1600} removeChildren={false}><p style={{fontWeight: "700", fontSize: "22px", marginTop: "-12px"}}>propone</p></FadingChildren>
            <FadingChildren startTime={700+1600*3} duration={200+(1600*3)} removeChildren={false}><p>desprenderse de los objetos,</p></FadingChildren>
            <FadingChildren startTime={700+1600*4} duration={200+(1600*3)} removeChildren={false}><p>desprenderse de los recuerdos,</p></FadingChildren>
            <FadingChildren startTime={700+1600*5} duration={200+(1600*3)} removeChildren={false}><p>desprenderse de la elección del encuadre,</p></FadingChildren>
            <FadingChildren startTime={700+1600*6} duration={200+(1600*3)} removeChildren={false}><p>desprenderse del criterio de selección, de la edición y del punto de vista</p></FadingChildren>
            <FadingChildren startTime={700+1600*7} duration={200+(1600*3)} removeChildren={false}><br/></FadingChildren>
            <FadingChildren startTime={700+1600*7} duration={200+(1600*4)} removeChildren={false}><p style={{fontWeight: "700", fontSize: "22px"}}>para crear una película autobiográfica automática</p></FadingChildren>
          </SectionWrapper>
        </ModalContent>
      </Modal>
    </OpenOnce>
    <StyledHeader>
      <Nav { ...navProps } />
      <div style={{position: "relative", top: "50%", transform: "translateY(-50%)", height: "fit-content"}}><h2 style={{textAlign:'right', fontSize:"28px", letterSpacing:"-1px;"}}>biógrafoImaginario</h2><p style={{fontSize:"15px", textAlign: "right", marginTop: "-30px", letterSpacing:"2px"}}>recambio automático de recuerdos</p></div>
    </StyledHeader>
    <SectionWrapper style={{width: "fit-content", maxWidth: "1200px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop:"100px"}}>
      <StyledContent>
        {children}
      </StyledContent>
    </SectionWrapper>
    </>
  );
};

export default BasicLayout;
