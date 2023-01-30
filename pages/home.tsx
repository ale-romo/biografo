import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
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

const HomePage = () => {
  const {data, loading, error} : any = useFetch('https://picsum.photos/v2/list');
  const {data: data2, loading: loading2, error: error2}: any = useFetch('https://biografoimaginario.com/getAllObjects');

  if (error) console.log(error);
  if (error2) console.log(error);

  const sendProps = (item: any) => {
    Router.push({
      pathname: `/objeto/${item.objectID}`,
      // query: {
      //   images: item.images,
      //   id: item.objectID,
      //   title: item.title,
      //   description: item.description,
      //   history: item.history,
      //   isAvailable: !item.isAuction,
      // },
    });
  }
  return <>
    {loading2 &&<Loader>Loading...</Loader>}
    {data2 &&
      <Carousel title="Artículos Biógrafo">
        {data2.map((item: any, i: number) => {
          const cardProps = {
            src: `https://biografoimaginario.com${JSON.parse(item.images)[0]}`,
            title: item.title,
            sold: item.soldUserId,
            action: () => sendProps(item),
          };
          return <CardB key={i} {...cardProps} />
        })}
      </Carousel>
    }

    {/* {loading &&<Loader>Loading...</Loader>}
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
    } */}

    <Modal
      isOpen={true}
      timer={5000}
      contentWidth="100%"
      contentHeight="100%"
      showCloseButton={false}
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
