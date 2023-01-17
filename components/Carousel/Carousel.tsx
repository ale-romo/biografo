import { ReactElement, useRef, useState } from "react";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 600px) {
    justify-content: space-between;
  }
  h2 {
    margin: 0 0 0 20px;
    align-self: center;
  }
`;

const CarouselControls = styled.div`
display:none;
  @media screen and (min-width: 600px) {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    z-index: 1;
  }

`;

interface WrapperProps {
  gradientRight: boolean;
  gradientLeft: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  &:after, &:before {
    content: '';
    pointer-events: none;
    height: 100%;
    width: 50px;
    background: rgb(255,255,255);
    position: absolute;
    top: 0;
    transition: opacity 0.3s;
    @media screen and (min-width: 600px) {
      width: 100px;
    }
  }
  &:before {
    opacity: ${p => p.gradientLeft ? 1 : 0};
    background: linear-gradient(90deg, rgba(255,255,255,.5) 0%, rgba(255,255,255,0) 100%);
    left: 0;
    z-index: 1;
    @media screen and (min-width: 600px) {
      background: linear-gradient(90deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,0) 100%);
    }
  }
  &:after {
    opacity: ${p => p.gradientRight ? 1 : 0};
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.5) 100%);
    right: 0;
    @media screen and (min-width: 600px) {
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.85) 100%);
    }
  }
`;

const Content = styled.div`
  width: 100%;
  overflow-x: scroll;
  position: relative;
  scroll-snap-type: x mandatory;
  display: flex;
  flex-direction: row;

  > * {
    scroll-snap-align: start;
  }
`;

const NavButton = styled.button<NavProps>`
  width: 60px;
  height: 60px;
  background: black;
  border:none;
  position: relative;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    display: block;
    border-top: 2px solid white;
    border-left: 2px solid white;
    width: 25%;
    height: 25%;
    top: 50%;
    left: 50%;
    transform: ${p => p.direction === 'left' ? 'translate(-30%, -50%) rotate(-45deg)' : 'translate(-60%, -50%) rotate(135deg) '};
  }
  &:hover {
    background: pink;
    &:before {
      border-color: black;
    }
  }
`;

interface NavProps {
  direction: 'left' | 'right';
}

interface Props {
  title: string;
  children: ReactElement;
}

const Carousel = ({ title, children }: Props) => {
  const carousel = useRef<HTMLInputElement>(null);
  const [gradientRight, setGradientRight] = useState(true);
  const [gradientLeft, setGradientLeft] = useState(false);
  const throttleInProgress = useRef<{}>();

  const handleScroll = (e: any) => {
    if (throttleInProgress.current) { return };
    throttleInProgress.current = true;
    setTimeout(() => {
      if (e.target.scrollWidth - window.innerWidth - e.target.scrollLeft < 10) {
        setGradientRight(false);
      } else if (!gradientRight) {
        setGradientRight(true);
      }
      if (e.target.scrollLeft === 0) {
        setGradientLeft(false);
      } else if (!gradientLeft) {
        setGradientLeft(true);
      }


      throttleInProgress.current = false;
    }, 100);
  };

  const navigateCarousel = (direction: 'left' | 'right') => {
    let scrollTo: number = 0;
    if (carousel.current && window) {
      const currentPos = carousel.current.scrollLeft;
      if(direction === 'right') {
        if (currentPos + window.innerWidth < carousel.current.scrollWidth - window.innerWidth) {
          scrollTo = currentPos + window.innerWidth;
        } else {
          scrollTo = carousel.current.scrollWidth - window.innerWidth;
        }
      } else if (direction === 'left') {

        if (currentPos - window.innerWidth > 0) {
          scrollTo = currentPos - window.innerWidth;
        } else {
          scrollTo = 0;
        }
      }
      carousel.current.scrollTo({
        top: 0,
        left: scrollTo,
        behavior: 'smooth',
      });
    }
    return;
  }

  return <>
    <Header>
      <h2>{title}</h2>
      <CarouselControls>
        <NavButton direction='left' onClick={() => navigateCarousel('left')} />
        <NavButton direction='right' onClick={() => navigateCarousel('right')} />
      </CarouselControls>
      </Header>
      <Wrapper gradientRight={gradientRight} gradientLeft={gradientLeft}>
        <Content ref={carousel} onScroll={handleScroll}>
          {children}
        </Content>
      </Wrapper>
  </>
}

export default Carousel;
