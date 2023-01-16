import styled, {css} from 'styled-components';
import Link from 'next/link';

const ButtonCssProps = css`
display: inline-block;
  border: none;
  background: black;
  color: white;
  cursor: pointer;
  padding: 20px;
  font-size: 14px;
  text-transform: uppercase;
  &:hover {
    background: pink;
    color: black;
  }
`;

const StyledButton = styled.button`
  ${ButtonCssProps}
`;

const StyledLink = styled.a`
  ${ButtonCssProps},
`

type clickAction = () => any;

interface Props {
  title: string;
  action?: clickAction | string;
  target?: string;
}

const Button =({title, action, target = '_self'}:Props) => {
  if(typeof action === 'string') {
    return <Link href={action} passHref>
      <StyledLink target={target}>{title}</StyledLink>
    </Link>
  } else {
    return <StyledButton onClick={action}>{title}</StyledButton>
  }
}

export default Button;
