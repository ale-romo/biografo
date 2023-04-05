import { NextPage } from "next";
import Router from "next/router";
import probe from 'probe-image-size';
import Card from "components/Cards/CardB";

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

const Objetos:NextPage = ({ items }: any) => {
  const sendProps = (item: any) => {
    Router.push({
      pathname: `/objeto/${item.objectID}`,
    });
  }
  return <>
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
    </>
}

export default Objetos;
