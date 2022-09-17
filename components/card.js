import Link from 'next/link';
import Image from 'next/image';

 
 
const Card = (props) => {
    return (
        <Link href={props.href}>
            <a className="
            bg-gradient-to-r from-orange-100 bord
            p-2  rounded-lg flex border-2
            items-center justify-center drop-shadow-md 
            hover:drop-shadow-[0_15px_15px_rgba(50,100,0,0.75)] ">
            <div className="">
                <div className="">
                    <h2 className="text-red-900 my-2 mx-1 "> {props.name}</h2>
                </div>

                <div className=" ">
                    <Image className="object-cover rounded-md" src={props.imageUrl} height={160} width={260} />
                </div>
            </div>
            </a>
        </Link>
    );
}

export default Card;