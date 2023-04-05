import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import probe from 'probe-image-size';
import Carousel from 'components/Carousel/Carousel';
import Modal from 'components/Modal/Modal';
import Card from 'components/Cards/CardB';
import {
  NegativeText,
  LargeText,
  SectionWrapper,
  Link1,
} from 'components/TextFormats/TextFormats';

const ModalContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
`;

export const getStaticProps = async () => {
  const res: any = await fetch('https://biografoimaginario.com:8888/getAllObjects');
  const data = await res.json();
  const itemsWithImageSizes = await Promise.all(
    data.map(async (item: any) => {
      const imageWithSize = {
        url: `https://biografoimaginario.com:8888${JSON.parse(item.images)[0]}`,
        size: await probe(`https://biografoimaginario.com:8888${JSON.parse(item.images)[0]}`),
      }
      item.imageWithSize = imageWithSize;
      return item;
    })
  );

  return {
    props: {
      items: itemsWithImageSizes,
    }
  }
}

const HomePage = ({ items }: any) => {
  const sendProps = (item: any) => {
    Router.push({
      pathname: `/objeto/${item.objectID}`,
    });
  }
  return <>
    {items &&
      <Carousel title="Artículos destacados">
        {items.map((item: any, i: number) => {
          const cardProps = {
            src: item.imageWithSize.url,
            title: item.title,
            width: item.imageWithSize.size.width/10,
            height: item.imageWithSize.size.height/10,
            sold: item.soldUserId,
            action: () => sendProps(item),
          };
          return <Card key={i} {...cardProps} />
        })}
      </Carousel>
    }

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
