import { useState } from 'react';
import Carousel from 'components/Carousel/Carousel';
import { useFetch } from 'lib/hooks/useFetch';

const HomePage = () => {
  const carouselItems : any = useFetch('https://picsum.photos/v2/list');
  const carouselProps = {
    items: carouselItems.response,
  };
  return <>
    {carouselProps.items.length &&
      <Carousel {...carouselProps} />
    }
  </>
}

export default HomePage;
