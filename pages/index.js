import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';

// import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';

import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';



//  main is active





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





      <main  class="bg-hero h-full bg-cover  bg-fixed ">   


      
        
        <Banner 
        buttonText={inFindingLocation ? "Locating..." : "View Stores Nearby"} 
        handleOnClick={handleOnClickBtnClick}
                  />  

        
        {locationErrorMsg && <p> Something went wrong: {locationErrorMsg} </p>}   
        {storeError && <p> Something went wrong: {storeError} </p>}

        <section className=" bg-amber-100 ">
          
        

        {/* if there was nearby coffee soters */}
        { coffeeStores.length > 0 && 
        <>
        <div className='bg-amber-100 drop-shadow-lg'>
          <h2 className="px-16 py-6 font-bold text-stone-700">Coffee Stores Near You:</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-12 py-3
        bg-gradient-to-b from-orange-200 via-orange-200 to-orange-100">
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
        <div className='bg-amber-100 drop-shadow-lg'>
            <h2 className="px-16 py-6 font-bold text-stone-700">Torono Coffee Stores:</h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-12 py-3
        bg-gradient-to-b from-orange-200 via-orange-100 to-orange-100 
        ">
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

        </section>
      </main>      

      <footer className="">

      </footer>
    </div>
  )
}
