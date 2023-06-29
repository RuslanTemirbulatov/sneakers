import React, { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({id, title, price, imageUrl, onFavorite, onPlus, favorited = false, added = false}) => {

    const [isAdded, setIsAdded] = useState(added);
    const [isFavorite, setIsFavorite] = useState(favorited);


    const onClickPlus = () => {
        setIsAdded(!isAdded);
        onPlus({title, price, imageUrl, id });
    }

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite)
        onFavorite({title, price, imageUrl, id})
    }

    return (
            <div className={styles.card} key={title}>
                <div  onClick={onClickFavorite} className={styles.favorite}>
                    {isFavorite ? <img src="/img/heart-enabled.svg" alt="disabled" />
                    : <img src="/img/heart-disabled.svg" alt="disabled" /> }
                </div>
                <img width={133} height={112} src={imageUrl} alt="sneakers" />
                    <h5>{title}</h5>
                <div className={styles.cardBotom}>
                    <div className={styles.cardSubTitle}>
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    <img className={styles.btnPlus} onClick={onClickPlus} src={isAdded ? "/img/success.svg" : "/img/plus.svg"} alt="plus" />
                </div>
            </div>
    );
};

export default Card;