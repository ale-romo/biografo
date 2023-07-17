import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from 'react';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: Pointer;
  &:hover {
    background: #EFEFEF;
  }
  margin-right: 35px;
  margin-bottom: 55px;
`;

interface statusProps {
  color: string;
}

const Status = styled.div<statusProps>`
  ${({ color }) => `
    color: ${color};
  `}
`;

type clickAction = () => any;

interface Props {
  src: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  sold?: boolean;
  isVideo?: boolean;
  action?: clickAction;
}

const CardC = ({
  src,
  width = 300,
  height = 220,
  title = '',
  description = "",
  sold = false,
  isVideo = false,
  action
}: Props) => {
  const [responsiveWidth, setResponsiveWidth] = useState(width);
  const [responsiveHeight, setResponsiveHeight] = useState(height);
  useEffect(() => {
    if(window.innerWidth - 20 < width) {
      setResponsiveWidth(window.innerWidth - 20 );
      setResponsiveHeight( height * (window.innerWidth -20) / width);
    }
  });
  return <StyledCard>
    <a onClick={action}>
        <Image
          src={src}
          width={responsiveWidth}
          height={responsiveHeight}
          alt={title}
          layout='fixed'
        />
      <h3>{title}</h3>
      {(!isVideo) ? <> {sold?
        <Status color="red">Vendido</Status> :
        <Status color="green">En venta</Status>}
        </> : <></>
      }
      <p>{description}</p>
    </a>
</StyledCard>
};

export default CardC;
