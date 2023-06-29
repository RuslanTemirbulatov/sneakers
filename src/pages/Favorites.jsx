import React from 'react';
import Card from '../components/Card/Card';


const Favorites = ({
            onAddToFavorite,
            items}) => {
    return (
        <div>
            <div className='content'>
              <div className='search'>
              <h1>Мои закладки</h1>
              </div>
                <div className="sneakers">
                  {
                    items.map((item) => (
                      <Card
                        key={item.title}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        {...item}
                      />
                    ))
                  }        
              </div>
            </div>
        </div>
    );
};

export default Favorites;