import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';

// import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';

import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';





export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, 
  }
}




export default function Home(props) {  


  const {handleTrackLocation, locationErrorMsg, inFindingLocation} = useTrackLocation();


  const [storeError, setStoreError] = useState(null);

  const {dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(  () => {
    
    async function fetchData() {
    if(latLong) {
      try{
        const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);


        const fetchCoffeeStoresV = await response.json();

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

  }

  fetchData();
  },[latLong])



  const handleOnClickBtnClick = () => {

     
    handleTrackLocation();
  }  

  return (
    <div className="">
      <Head>
        <title >Coffee App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">            
        <Banner 
        buttonText={inFindingLocation ? "Locating..." : "View Stores Nearby"} 
        handleOnClick={handleOnClickBtnClick}
                  />  
        {locationErrorMsg && <p> Something went wrong: {locationErrorMsg} </p>}   
        {storeError && <p> Something went wrong: {storeError} </p>}

        <div className="">
          <Image src="/static/hero-image.png" width={200} height={100}/>
        </div>

        {/* if there was nearby coffee soters */}
        { coffeeStores.length > 0 && 
        <>
        <h2 className="">Coffee Stores Near You:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-12">
          {coffeeStores.map((coffeeStore) => {
              return  <Card 
              key={coffeeStore.fsq_id}
              name={coffeeStore.name}
              imageUrl={coffeeStore.imgUrl}
              href={`/coffee/${coffeeStore.fsq_id}`}
              className=""/>
          })
          }         
        </div>
        </>
        }



        { props.coffeeStores.length > 0 && 
        <>
        <h2 className="">Torono Coffee Stores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {props.coffeeStores.map((coffeeStore) => {
              return  <Card 
              key={coffeeStore.fsq_id}
              name={coffeeStore.name} 
              imageUrl={coffeeStore.imgUrl} 
              href={`/coffee/${coffeeStore.fsq_id}`} 
              className=""/>
          })
          }         
        </div>
        </>
        }

      </main>      

      <footer className="">

      </footer>
    </div>
  )
}
