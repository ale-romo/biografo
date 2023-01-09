import styled from 'styled-components';
import Waves from 'components/Waves';

const StyledFooter = styled.footer`
  background-color: #2A3554;
  padding: 20px 0 40px;
  color: white;
`;
const Footer = () => {
  return <>
    <Waves />
    <StyledFooter>
      Something
    </StyledFooter>
  </>
};

export default Footer;
