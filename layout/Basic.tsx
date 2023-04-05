import styled, { createGlobalStyle } from "styled-components";
import Nav from "components/Nav/Nav";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

const StyledHeader = styled.header`
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index:2;
  h2 {
    margin: 5px 0 0 10px;
  }
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

  return (
    <>
    <StyledHeader>
      <h2>Biógrafo imaginario</h2>
      <Nav { ...navProps } />
    </StyledHeader>
    <StyledContent>
      {children}
    </StyledContent>
    </>
  );
};

export default BasicLayout;
