import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import probe from 'probe-image-size';
import Carousel from 'components/Carousel/Carousel';
import { useFetch } from 'lib/hooks/useFetch';
import Card from 'components/Cards/CardA';
import Modal from 'components/Modal/Modal';
import CardB from 'components/Cards/CardB';
import {
  NegativeText,
  LargeText,
  SectionWrapper,
  Link1,
} from 'components/TextFormats/TextFormats';

const Loader = styled.div`
  width: 100%;
  padding: 100%;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

const HomePage = ({ items }: any) => {
  const {data, loading, error} : any = useFetch('https://picsum.photos/v2/list');


  if (error) console.log(error);

  const sendProps = (item: any) => {
    Router.push({
      pathname: `/objeto/${item.objectID}`,
    });
  }
  return <>
    {loading &&<Loader>Loading...</Loader>}
    <CardB src='https://biografoimaginario.com:8888/thumbs/3/3/6/0/1fec-cd23-440d-89d3-8dc01467cfba.png' width={400} height={800} alt='Video'  ></CardB>
    {data &&
      <Carousel title="Artículos en venta">
        {data.map((item: any, i: number) => {
          const cardProps = {
            src: item.download_url,
            width: item.width/10,
            height: item.height/10,
            alt: item.author,
            action: `comprar/${item.author}`,
            buttonText: 'Comprar ahora',
          }
          return <Card key={i} {...cardProps} />
        })
      }
      </Carousel>
    }

    <Modal
      isOpen={true}
      timer={5000}
      contentWidth="100%"
      contentHeight="100%"
      showCloseButton={false}
      triggerText="Open modal"
    >
      <ModalContent>
        <p>el autor de esta página está <LargeText>en construcción</LargeText>, vende sus pertenencias a cambio de que reciclen su memoria.</p>
        <p>todos los objetos aquí publicados están a la venta pero su precio no es dinero, sinó la invención de nuevos recuerdos.</p>
        <p>hay increibles oportunidades a cero peso.</p>
        <NegativeText>¡compra yá!</NegativeText>
      </ModalContent>
    </Modal>
    <SectionWrapper>
      <p>
        Estos objetos están a la venta. Su precion n es dinero, sino la invención de nuevos recuerdos. ver <Link href='/acerca'><Link1>como funciona</Link1></Link>
      </p>
    </SectionWrapper>
  </>
}

export default HomePage;
