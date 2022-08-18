import { useRouter } from 'next/router';
import Link from 'next/link';


const hello = function() {
    const router = useRouter();
    
    // console.log("heere is router log" , router);

    return(
        <div>
            <h1>
                Hello! {router.query.dynamic}
            </h1>
            <Link href="/coffee/more"><a>explor more</a></Link>
            <br></br>
            <Link href="/coffee/more"><a>explor more</a></Link>
        </div>
    )
} 

export default hello;