import React, { ReactNode, useState, useEffect } from 'react';
import cookie from 'js-cookie';

interface Props {
	children: ReactNode;
	cookieName: string;
	test?: boolean;
	reset?: boolean;
	expires?: any;
}

const CookieChecker: React.FC<Props> = ({ cookieName, children, test=false, reset=false, expires=0}) => {
	const [showDiv, setShowDiv] = useState(false);

	useEffect(() => {
		const hasCookie = !!cookie.get(cookieName);
		if(!hasCookie || test){
			if(expires != 0){
				cookie.set(cookieName, 'true', {expires: expires});
			} else {
				cookie.set(cookieName, "true");
			}
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