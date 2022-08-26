import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.css';
// import styles from "./banner.module.css";
import cls from 'classnames';
 
 
const Card = (props) => {
    return (
        <Link href={props.href}>
            <a className={styles.cardLink}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}> {props.name}</h2>
                </div>

                <div className={styles.cardImageWrapper}>
                    <Image className={styles.cardImage} src={props.imageUrl} height={160} width={260} />
                </div>
            </div>
            </a>
        </Link>
    );
}

export default Card;