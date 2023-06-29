import { useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';



// const arr = [{title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/img1.jpg'}, 
// {title: 'Мужские Кроссовки Nike Air Max 270', price: 12999, imageUrl: '/img/sneakers/img2.jpg'}, 
// {title: 'Мужские Кроссовки Nike Mid Suede v2.0', price: 8499, imageUrl: '/img/sneakers/img3.jpg'}, 
// {title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: '/img/sneakers/img4.jpg'}, 
// {title: 'Мужские Кроссовки Under Armour Curry 8', price: 15199, imageUrl: '/img/sneakers/img5.jpg'}, 
// {title: 'Мужские Кроссовки Nike Kyrie 7', price: 11299, imageUrl: '/img/sneakers/img6.jpg'}, 
// {title: 'Мужские Кроссовки Jordan Air Jordan 11', price: 10799, imageUrl: '/img/sneakers/img7.jpg'}, 
// {title: 'Мужские Кроссовки Nike LeBron XVIII', price: 16499, imageUrl: '/img/sneakers/img8.jpg'}, 
// {title: 'Мужские Кроссовки Nike Lebron XVIII Low', price: 13999, imageUrl: '/img/sneakers/img3.jpg'}, 
// {title: 'Мужские Кроссовки Nike Blazer v2.0', price: 8499, imageUrl: '/img/sneakers/img6.jpg'}, 
// {title: 'Кроссовки Puma X Future Rider v2.0', price: 8999, imageUrl: '/img/sneakers/img11.jpg'}, 
// {title: 'Мужские Кроссовки Nike Kyrie Flytrap IV', price: 11299, imageUrl: '/img/sneakers/img11.jpg'}];

function App() {

  const [items, setItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');


  useEffect( () => {
    async function fetchData() {
      const cartResponse = await axios.get('https://64803a94f061e6ec4d48d979.mockapi.io/cart');
      const favoritesResponse = axios.get('https://6482bf59f2e76ae1b95b7503.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://64803a94f061e6ec4d48d979.mockapi.io/items');

      setCartItems(favoritesResponse.data)
      setFavoriteItems(cartResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData();

  }, [])

  const onAddToCart =  (obj) => {
    console.log(obj)
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://64803a94f061e6ec4d48d979.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://64803a94f061e6ec4d48d979.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favoriteItems.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://6482bf59f2e76ae1b95b7503.mockapi.io/favorites/${obj.id}`);
      }
      else {
        const {data} = await axios.post('https://6482bf59f2e76ae1b95b7503.mockapi.io/favorites', obj);
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
        alert('Ошибка при добавлении в закладки');
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64803a94f061e6ec4d48d979.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }


  return (
    <div  className="wrapper">
      {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)}/>
      <Routes>
        <Route path='/' element={<Home 
          searchValue={searchValue} 
          onChangeSearchInput={onChangeSearchInput} 
          onAddToCart={onAddToCart} 
          items={items} 
          setSearchValue={setSearchValue}
          onAddToFavorite={onAddToFavorite}
          cartItems={cartItems} />} />
        <Route path='/favorites' element={<Favorites 
          items={favoriteItems} 
          onAddToFavorite={onAddToFavorite} />} />
      </Routes>
      
    </div>
  );
}

export default App;
