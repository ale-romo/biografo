import Carousel from 'components/Carousel/Carousel';
import { useFetch } from 'lib/hooks/useFetch';
import Card from 'components/Cards/CardA';


const HomePage = () => {
  const {data, loading, error} : any = useFetch('https://picsum.photos/v2/list');
  // const {data2, loading2, error2}: any = useFetch('https://biografoimaginario.com/getAllObjects');
  // if(data2) console.log(data2);
  if (error) console.log(error);

  return <>
    {loading &&<div>Loading...</div>}
    {data &&
      <Carousel>
        {data.map((item: any, i: number) => {
          const cardProps = {
            src: item.download_url,
            width: item.width/10,
            height: item.height/10,
            alt: item.author,
            action: `comprar/${item.author}`,
          }
          return <Card key={i} {...cardProps} />
        })
      }
      </Carousel>
    }
  </>
}

export default HomePage;
