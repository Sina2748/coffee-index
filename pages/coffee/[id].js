import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import coffeeStoreData from '../../data/coffee-stores.json';
import styles from '../../styles/coffe-store.module.css';
import cls from 'classnames'; 

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';


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
    console.log("params", params);

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
    console.log({id});

    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)

    const {
      state: { 
      coffeeStores
    }
  } = useContext(StoreContext)

  const handleCreateCoffeeStore = async (coffeeStore) => {
    console.log("coffeeStore!!!!!!!!!!!!!", coffeeStore);
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
      console.log("dbCoffeeStore!!!!!!!!!!!!!!!", dbCoffeeStore);

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

    const [votingCount, setVotingCount] = useState(1);

    const handleUpvoteButton = () => {
      console.log("handle upvote");
      let count = votingCount + 1;
      setVotingCount(count);
    };

    return (
      <div className={styles.layout}>
        <Head>
          <title>{name}</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            />
          </div>
          <div className={cls("glass", styles.col2)}>
            {address && (
              <div className={styles.iconWrapper}>
                <Image src="/static/icons/places.svg" width="24" height="24" />
                <p className={styles.text}>{address}</p>
              </div>
            )}
            {neighbourhood && (
              <div className={styles.iconWrapper}>
                <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                <p className={styles.text}>{neighbourhood}</p>
              </div>
            )}
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/star.svg" width="24" height="24" />
              <p className={styles.text}>{votingCount}</p>
            </div>
            <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
              Up vote!
            </button>
          </div>
        </div>
      </div>
    );
  };
  export default CoffeeStore;