import Image from 'next/image';
import { ReactElement, useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Content = styled.div`
	* {
		position: relative;
	}
	*:nth-child(1){
		left: 100px;
	}
`;


const Sticker = () => {
	const [shouldScroll, setShouldScroll] = useState(false);
	
	useEffect(() => {
		let onScroll = () => {
			if(window.scrollY > 20){
				setShouldScroll(true);
			} else {
				setShouldScroll(false);
			}
		}
		window.addEventListener("scroll", onScroll )
	}, [])

	let topPos = '15%';
	let transformVar = '0turn';
	let stickerOpacity = 1;
	let stickerAltOpacity = 0;
	if (shouldScroll){
		topPos = '85%';
		transformVar = '3turn'
		stickerOpacity = 0;
		stickerAltOpacity = 1;
	}
	console.log(topPos)

	return <div style={{position: "fixed", top: topPos, right: '3vw', zIndex:'9', transition: "top 0.75s ease-in-out"}}>
		<Content>
			<Image src='/images/sticker.svg' alt="sticker" height="100" width="100" style={{zIndex: '1', opacity: stickerOpacity, transition: "transform 1s ease-in-out, opacity 0.5s ease-in-out", transform: 'rotate('+transformVar+')'}}></Image>
			<Image src='/images/stickerCambio.svg' alt="sticker" height="100" width="100" style={{zIndex: '0',  opacity: stickerAltOpacity, transition: "transform 1s ease-in-out, opacity 0.5s ease-in-out", transform: 'rotate('+transformVar+')'}}></Image>
		</Content>
	</div>
  };
  
  export default Sticker;
  