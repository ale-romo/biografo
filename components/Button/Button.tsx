import styled, {css} from 'styled-components';
import Link from 'next/link';
import { ReactNode } from 'react';

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
  action?: clickAction | string;
  target?: string;
  children?: ReactNode;
}

const Button =({ action, target = '_self', children }:Props) => {
  if(typeof action === 'string') {
    return <Link href={action} passHref>
      <StyledLink target={target}>{children}</StyledLink>
    </Link>
  } else {
    return <StyledButton onClick={action}>{children}</StyledButton>
  }
}

export default Button;
