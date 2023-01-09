import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledCarousel = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const StyledCarouselContent = styled.div<ContentProps>`
  width: ${p => p.width}px;
`;

interface ContentProps {
  width: number;
}

interface Item {
  width: number;
  height: number;
  url: string;
  download_url: string;
  author: string;
};

interface Props {
  items: Item[];
}

const Carousel = (Props: Props) => {
  const contentWidth = Props.items.reduce((acc, cv) => acc + cv.width/10,
  0);

  const setSlots = (items: Item[]) => items.map((item, i) => {
    return <Image key={i} src={item.download_url} width={item.width/10} height={item.height/10} alt={item.author} />
  });

  return <StyledCarousel>
    <StyledCarouselContent width={contentWidth}>
      {Props?.items?.length && setSlots(Props.items)}
    </StyledCarouselContent>
  </StyledCarousel>
}

export default Carousel;
