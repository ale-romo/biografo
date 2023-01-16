import { ReactElement, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  padding: 0 20px;
  scroll-snap-type: x mandatory;
`;

const CarouselContent = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: row;
  > * {
    scroll-snap-align: start;
  }
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: row;
  position: absolute;
  right: 0;
  column-gap: 5px;
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
  children: ReactElement;
}

const Carousel = (Props: Props) => {
  const carousel = useRef<HTMLInputElement>(null);

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
        console.log(carousel.current.scrollWidth - window.innerWidth)
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

  return <Container ref={carousel}>
    <CarouselControls>
      <NavButton direction='left' onClick={() => navigateCarousel('left')} />
      <NavButton direction='right' onClick={() => navigateCarousel('right')} />
    </CarouselControls>
    <CarouselContent>
      {Props.children}
    </CarouselContent>
  </Container>
}

export default Carousel;
