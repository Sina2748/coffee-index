import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';

import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';

import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';


// 



//
export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  console.log({coffeeStores});
  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  }
}

//

//
export default function Home(props) {  
  console.log("props from getStaticProps!!", props);

  const {handleTrackLocation, locationErrorMsg, inFindingLocation} = useTrackLocation();
  // console.log({ latLong, locationErrorMsg, inFindingLocation});

  // const [coffeeStores, setCoffeeStores] = useState('');
  const [storeError, setStoreError] = useState(null);

  const {dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(  () => {
    
    async function fetchData() {
    if(latLong) {
      try{
        const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
        // console.log("coffee stores from fetchCoffeeStores!!", response);

        const fetchCoffeeStoresV = await response.json();

        // setCoffeeStores(fetchCoffeeStoresV);
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: {
            coffeeStores: fetchCoffeeStoresV,
          },
        })
        setStoreError("");

      } catch(error) { 
        // set error
        console.log({error});
        setStoreError(error.message);
      }
    }
    console.log("kkkkk:",latLong);
  }

  fetchData();
  },[latLong])



  const handleOnClickBtnClick = () => {
    console.log("hi banner button");
     
    handleTrackLocation();
  }  

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>            
        <Banner 
        buttonText={inFindingLocation ? "Locating..." : "View Stores Nearby"} 
        handleOnClick={handleOnClickBtnClick}
                  />  
        {locationErrorMsg && <p> Something went wrong: {locationErrorMsg} </p>}   
        {storeError && <p> Something went wrong: {storeError} </p>}

        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400}/>
        </div>

        { coffeeStores.length > 0 && 
        <>
        <h2 className={styles.hearding2}>Coffee Stores Near You:</h2>
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => {
              return  <Card key={coffeeStore.fsq_id} name={coffeeStore.name} imageUrl={coffeeStore.imgUrl} href={`/coffee/${coffeeStore.fsq_id}`} className={styles.card}/>
          })
          }         
        </div>
        </>
        }



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
