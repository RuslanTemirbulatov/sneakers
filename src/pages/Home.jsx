import React from 'react';
import Card from '../components/Card/Card';

const Home = ({searchValue,
            onChangeSearchInput,
            onAddToCart,
            setSearchValue,
            onAddToFavorite,
            items,
            cartItems}) => {
    return (
        <div>
            <div className='content'>
      <div className='search'>
      <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img src='/img/search.svg' alt='serach' />
          <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder='Поиск...' />
          {searchValue &&  <img onClick={() => setSearchValue('')} className='clear' src="/img/cross.png" alt="cross" />}
         {console.log(cartItems)}
        </div>
      </div>
        <div className="sneakers">
            {
              items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item) => (
                <Card
                  key={item.title}
                  onFavorite={obj => onAddToFavorite(obj)}
                  onPlus={obj => onAddToCart(obj)}
                  // added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                  {...item}
                 />
              ))
            }        
        </div>
        ...
      </div>
        </div>
    );
};

export default Home;