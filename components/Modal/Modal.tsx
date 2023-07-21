import { ReactElement, useState, useEffect } from "react";
import Button from "components/Button/Button";
import styled from 'styled-components';
import useEscape from "lib/hooks/useEscape";

interface wrapperProps {
  open: boolean;
  background: string;
}

let zIndexWrapper = 10;

const Wrapper = styled.div<wrapperProps>`
  ${({ open, background }) => `
    opacity: ${open ? 1 : 0};
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${zIndexWrapper};
    pointer-events: ${open ? 'auto' : 'none'};
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
    background-color: ${background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

interface contentProps {
  width: string;
  height: string;
  background: string;
};

const Content = styled.div<contentProps>`
  ${({ width, height, background }) =>`
    width: ${width};
    height: ${height};
    background-color: ${background};
    overflow: scroll;
    position: relative;
  `}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

interface Props {
  triggerText?: string | null;
  children: ReactElement | ReactElement[];
  isOpen?: boolean;
  wrapperBackground?: string;
  contentWidth?: string;
  contentHeight?: string;
  contentBackground?: string;
  timer?: number;
  showCloseButton?: boolean;
  zIndex?: number;
};

const Modal = ({
  triggerText,
  children,
  wrapperBackground = 'rgba(0,0,0,0.8)',
  contentWidth = '80vw',
  contentHeight = '80vh',
  contentBackground = '#FFFFFF',
  isOpen = false,
  timer = 0,
  showCloseButton = true,
  zIndex = 10,
}: Props) => {
  const [open, setOpen] = useState(false);
  useEscape(() => setOpen(isOpen));
  useEffect(() => {
    setOpen(isOpen);
    if(timer){
      setTimeout(() => {setOpen(false)}, timer);
    }
  }, []);
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (open) {
        body.classList.add('frozen');
      } else {
        body.classList.remove('frozen');
      }
    }
  }, [open]);
  zIndexWrapper = zIndex;
  return <>
    {triggerText &&
      <Button action={() => setOpen(true)}>{triggerText}</Button>
    }
    <Wrapper open={open} background={wrapperBackground} onClick={() => setOpen(false)}>
      <Content width={contentWidth} height={contentHeight} background={contentBackground} onClick={e => e.stopPropagation()}>
        {showCloseButton &&
          <ButtonWrapper>
            <Button action={() => setOpen(false)} type="close"/>
          </ButtonWrapper>
        }
        {children}
      </Content>
    </Wrapper>
  </>
}

export default Modal;
