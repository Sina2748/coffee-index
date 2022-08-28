import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';

import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';


//
export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  console.log(coffeeStores);
  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  }
}


//
export default function Home(props) {
  // console.log("props from fsq!!", props);

  const handleOnClickBtnClick = () => {
    // console.log("hi Banner button")
  }  

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>            
        <Banner buttonText="View Stores Nearby" handleOnClick={handleOnClickBtnClick}  />  
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400}/>
        </div>
        { props.coffeeStores.length > 0 && 
        <>
        <h2 className={styles.hearding2}>Torono Coffee Stores</h2>
        <div className={styles.cardLayout}>
          {props.coffeeStores.map((coffeeStore) => {
              return  <Card key={coffeeStore.fsq_id} name={coffeeStore.name} imageUrl={coffeeStore.imgUrl} href={`/coffee/${coffeeStore.fsq_id}`} className={styles.card}/>
          })
          }         
        </div>
        </>
        }
      </main>
      

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
