import Link from 'next/link';
import Image from 'next/image';

 
 
const Card = (props) => {
    return (
        <Link href={props.href}>
            <a className="">
            <div className="">
                <div className="">
                    <h2 className="text-red-900"> {props.name}</h2>
                </div>

                <div className="">
                    <Image className="" src={props.imageUrl} height={160} width={260} />
                </div>
            </div>
            </a>
        </Link>
    );
}

export default Card;