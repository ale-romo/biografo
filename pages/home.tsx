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
      <Carousel title="Artículos en venta">
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
    <h1>Some more content </h1>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </>
}

export default HomePage;
