import React from 'react';

const Drawer = ({onClose, items=[], onRemove }) => {
    return (
        <div>
            <div onClick={onClose} className="overlay">
                <div onClick={(e) => {e.stopPropagation()}} className="drawer">
                    <div className="drawer-uptitle">
                        <h2>Корзина</h2>
                        <img onClick={onClose} width={30} src="/img/btn-remove.svg" alt="remove" />
                    </div>
                    {
                        items.length > 0 ? 
                        <>
                        <div className="items">
                        {items.map((obj) =>(
                            <div className="cartItem">
                            <img width={70} height={70} src={obj.imageUrl} alt="sneakers" />
                            <div className='cartItem-title'>
                                <p>{obj.title}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img onClick={() => onRemove(obj.id)} className='removeBtn' src="/img/btn-remove.svg" alt="remove" />
                            </div>
                        ))}
                        
                    </div>
                    <div className='cartTotalBlock'>
                        <div>
                            <li className="cartItemTitle">
                                <span>Итого: </span>
                                <div></div>
                                <b>21 498 руб. </b>
                            </li>
                            <li className="cartItemTitle">
                                <span>Налог 5%: </span>
                                <div></div>
                                <b>1074 руб. </b>
                            </li>
                            <button>Оформить заказ</button>
                        </div>
                    </div>
                    </> :

                    <div className="cartEmpty">
                            <img src="/img/cartEmpty.png" alt="empty" />
                            <h2>Корзина пустая</h2>
                            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                            <button onClick={onClose} className='greenButton'>Вернуться назад</button>
                        </div>
                    }
                        
                    
                </div>
            </div>
        </div>
    );
};

export default Drawer;