import { ReactElement, useState, useEffect } from "react";

import styled from "styled-components";

export const NegativeText = styled.p`
  color: white;
  background: black;
`;

export const LargeText = styled.span`
  font-size: 25px;
`;

export const SectionWrapper = styled.section`
  padding: 50px;
  max-width: 1000px;
`;

export const Link1 = styled.a`
  background: black;
  color: white;
  cursor: pointer;
`;

export const LoginInput = styled.input`
  padding: 19px;
  background: white;
  border-radius: 0;
  border: 1px solid #dedede;
`;

interface Props {
  children: ReactElement | ReactElement[];
  startTime?: number;
  duration?: number;
  removeChildren?: boolean;
};


export const FadingChildren: React.FC<Props> = ({children, startTime=200, duration=10000, removeChildren=true}) => {
	const [isActive, setIsActive] = useState(false);
	const [isGone, setIsGone] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        setTimeout(() => {setIsGone(true)}, 1100);
      }, duration);
    }, startTime);
  }, []);

  if(isGone && removeChildren){
    return <></>;
  }

  let className = isActive ? "fadingChildrenActive" : "";

  return <div style={{
    transition: "all 1s ease-in-out",
    opacity: 0}} className={className}>{children}</div>

};