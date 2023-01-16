import { useRouter } from 'next/router';

interface Props {
  pid: string;
}

const Comprar  = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <h1>{pid}</h1>
}

export default Comprar;
