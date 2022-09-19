import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import coffeeStoreData from '../../data/coffee-stores.json';

import cls from 'classnames'; 

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';

import useSWR from 'swr';


//   THIS IS THE withTailwind //


export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: { 
                id: coffeeStore.fsq_id.toString(),
            },
        };
    })
    return {
      paths,
      fallback: true, // can also be true or 'blocking'
    }
  }

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores();
    const params = staticProps.params;

    const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id;
      })

    return {
      props: {
        coffeeStore: findCoffeeStoreById ? findCoffeeStoreById :     {  } ,
     },
    };
  }

  const CoffeeStore = (initialProps) => {
    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    const id = router.query.id;  


    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)

    const {
      state: { 
      coffeeStores
    }
  } = useContext(StoreContext)

  const handleCreateCoffeeStore = async (coffeeStore) => {

    try {
      
      // const id,  name, votting, imgUrl, neighbourhood, address = coffeeStore.fsq_id;

      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: coffeeStore.fsq_id,
            name: coffeeStore.name,
            votting: 0,
            imgUrl: coffeeStore.imgUrl,
            neighbourhood: coffeeStore.neighbourhood || "",
            address: coffeeStore.location.address || "",
            }),
      });
      const dbCoffeeStore = response.json();


    } catch(err) {
      console.error('Error creating coffee store', err); 
    }
  }

  useEffect(() => {
    if(isEmpty(initialProps.coffeeStore)) {
       if(coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id.toString() === id;
        });
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }

       }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore)
    }
  },[id, initialProps, initialProps.coffeeStore]);

    const { name,   address, location, neighbourhood, imgUrl } = coffeeStore;

    const [votingCount, setVotingCount] = useState(0);

  
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const {data, error} = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

    useEffect(() => {
     
      if (data && data.length > 0) {

        setCoffeeStore(data[0]);

        setVotingCount(data[0].votting); 
      }
  
    }, [data]);

    if (error) {
      return <div>
        Something whent wrong retrieving coffee store
      </div>
    }

    const handleUpvoteButton = async () => {    
      
        try {          

          const response = await fetch('/api/favouriteCoffeeStoreById', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                }),
          });
          
          const dbCoffeeStore = response.json();

          
          if (dbCoffeeStore  ) {
            let count = votingCount + 1;
            setVotingCount(count);

          }

    
        } catch(err) {
          console.error('Error updating coffee store', err); 
        }
      




    };

    return ( 
      <div className="">
        <Head>
          <title>{name}</title>
        </Head>
        <div className=" bg-hero bg-cover    grid h-screen place-items-center  ">
        <div className='bg-orange-200 bg-opacity-80 h-screen w-screen absolute'></div>
        <div className="bg-orange-100  sm:flex   m-3 

            bg-gradient-to-bl from-orange-200 to-orange-300 bord
            p-2  rounded-lg  border-2
            items-start justify-center drop-shadow-md 
            hover:drop-shadow-[0_15px_15px_rgba(123,52,30,0.55)]   transition duration-500
        
         ">
          <div className="bg-white bg-opacity-30  grid rounded-b-2xl">
            <div className="bg-red-900 bg-opacity-25 pl-3  font-bold text-stone-700">
              <Link href="/" className="px-16 py-6 font-bold text-stone-700">
                <a>← Back to home</a>
              </Link>
            </div>

            <div className="">
              <h1 className="py-6 pl-8">{name}</h1>
            </div>
            <Image
            className="rounded-2xl "
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={360}
              
              alt={name}
            />
          </div>


          <div className=" bg-white bg-opacity-30 mt-3 sm:ml-3 sm:mt-0 sm:w-3/4 ">
            {address && (
              <div className="flex space-x-5 p-3">
                <Image src="/static/icons/places.svg" width="24" height="24" className='opacity-60' />
                <p className="">{address}</p>
              </div>
            )}
            {neighbourhood && (
              <div className="flex space-x-5 p-3">
                <Image src="/static/icons/nearMe.svg" width="24" height="24" className='opacity-60' />
                <p className="">{neighbourhood}</p>
              </div>
            )}
            <div className="flex space-x-5 p-3">
              <Image src="/static/icons/star.svg" width="24" height="24" className='opacity-60' />
              <p className="">{votingCount}</p>
            
            <button className="bg-orange-300 px-6 py-0.5 rounded-lg
            hover:drop-shadow-[0_2px_2px_rgba(123,52,30,0.55)] transition duration-500
            " onClick={handleUpvoteButton}>
              Up Vote!
            </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  };
  export default CoffeeStore;