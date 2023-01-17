import { useRouter } from 'next/router';
import Webcam from 'components/Webcam/Webcam';

interface Props {
  pid: string;
}

const Comprar  = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <>
    <h1>{pid}</h1>
    <Webcam />
  </>
}

export default Comprar;
