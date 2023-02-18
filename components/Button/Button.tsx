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
  &:disabled {
    background-color: gray;
    color: white;
  }
`;

const StyledButton = styled.button`
  ${ButtonCssProps}
`;

const StyledLink = styled.a`
  ${ButtonCssProps},
`
const CloseIcon = styled.div`
  cursor: pointer;
  &:before, &:after {
    content: '';
    background: white;
    left:25%;
    width: 60%;
    height: 4px;
    position: absolute;
    display: block;
  }
  &:before {
    top: 13px;
    transform: rotate(-45deg) translate(-3px, 2px);
  }
  &:after {
    bottom: 13px;
    transform: rotate(45deg) translate(-4px, -4px);
  }
  &:hover {
    &:before, &:after {
      background: black;
    }
  }
`;

type clickAction = () => any;

interface Props {
  action?: clickAction | string;
  target?: string;
  children?: ReactNode;
  type?: 'close' | null;
  disabled?: boolean;
}

const Button =({ action, target = '_self', children, type, disabled = false }:Props) => {
  if(typeof action === 'string') {
    return <Link href={action} passHref>
      <StyledLink target={target}>{children}</StyledLink>
    </Link>
  } else {
    return <StyledButton type ="button" onClick={action} disabled={disabled}>
      {type === 'close' &&
        <CloseIcon />
      }
      {children}
    </StyledButton>
  }
}

export default Button;
