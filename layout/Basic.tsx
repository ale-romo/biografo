import styled, { createGlobalStyle } from "styled-components";
import Nav from "components/Nav/Nav";

export const GlobalStyle = createGlobalStyle`
    // this is the shared style
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

h1 {
    color: yellow !important; // the important is just to show that the style works!
}

  // anything else you would like to include
`;

const StyledHeader = styled.header`
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h2 {
    margin: 5px 0 0 10px;
  }
;`

const BasicLayout = ({ children }: { children: any }) => {
  const navProps = {
    items: [
      {
        url: '/home',
        title: 'Home',
      },
      {
        url: '/about',
        title: 'About Us',
      }
    ]
  }

  return (
    <>
    <StyledHeader>
      <h2>Biógrafo imaginario</h2>
      <Nav { ...navProps } />
    </StyledHeader>
      {children}
    </>
  );
};

export default BasicLayout;
