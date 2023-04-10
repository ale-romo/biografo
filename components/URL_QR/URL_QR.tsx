import {useEffect, useState} from "react";
import QRCode from "react-qr-code";

const URL_QR = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if(!isClient){
        return null;
    }

    return <>
        <QRCode value={window.location.href}></QRCode>
    </>
}

export default URL_QR;
