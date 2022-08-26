import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.css';

const Card = (props) => {
    return (
        <Link href={props.href}>
            <a>
                <h2> {props.name}</h2>
                <Image src={props.imageUrl} height={160} width={260} />
            </a>
        </Link>
    );
}

export default Card;