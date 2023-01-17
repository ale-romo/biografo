import styled from "styled-components";
import Image from "next/image";
import Button from 'components/Button/Button';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  &:hover {
    background: #EFEFEF;
  }
`;

const StyledContent = styled.div`
  padding: 20px;
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

type clickAction = () => any;

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
  action?: clickAction | string;
}

const CardA = ({src, width, height, alt, action}: Props) => {
  const buttonProps = {
    title: 'Comprar ahora',
    action: action,
  }


  console.log((window.innerWidth -20))
  console.log(height * (window.innerWidth -20) / width)
  return <StyledCard>
  <Image
    src={src}
      width={window.innerWidth - 20 < width ? window.innerWidth - 20 : width}
      height={window.innerWidth -20 < width ? height * (window.innerWidth -20) / width : height}
      alt={alt}
      layout='fixed' />
  <StyledContent>
    <h2>SubtitleStuff</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
    </p>
    {action && <Button {...buttonProps}>{alt}</Button>}
  </StyledContent>
</StyledCard>
}

export default CardA;
