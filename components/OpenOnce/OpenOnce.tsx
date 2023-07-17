import React, { ReactNode, useState, useEffect } from 'react';
import cookie from 'js-cookie';

interface Props {
	children: ReactNode;
	cookieName: string;
	test?: boolean;
	reset?: boolean;
}

const CookieChecker: React.FC<Props> = ({ cookieName, children, test=false, reset=false}) => {
	const [showDiv, setShowDiv] = useState(false);

	useEffect(() => {
		const hasCookie = !!cookie.get(cookieName);
		if(!hasCookie || test){
			cookie.set(cookieName, 'true', {expires: 28});
			setShowDiv(true);
		}
	}, []);

	if(reset){
		if(!!cookie.get(cookieName)){
			cookie.remove(cookieName);
		}
	}

	return <>{ showDiv && children } </>;

};

export default CookieChecker;