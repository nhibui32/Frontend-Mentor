import React, {useEffect, useState} from 'react'
import Data from '../data/data.json'
import Cart from './Cart'
import cartIcon from '../assets/images/icon-add-to-cart.svg'
import Increase from '../assets/images/icon-increment-quantity.svg';
import Decrease from '../assets/images/icon-decrement-quantity.svg'
import waffleImage from '../assets/images/image-waffle-desktop.jpg';
import cremeBruleeImage from '../assets/images/image-creme-brulee-desktop.jpg';
import macaronImage from '../assets/images/image-macaron-desktop.jpg';
import tiramisuImage from '../assets/images/image-tiramisu-desktop.jpg';
import baklavaImage from '../assets/images/image-baklava-desktop.jpg';
import meringueImage from '../assets/images/image-meringue-desktop.jpg';
import cakeImage from '../assets/images/image-cake-desktop.jpg';
import brownieImage from '../assets/images/image-brownie-desktop.jpg';
import pannaCottaImage from '../assets/images/image-panna-cotta-desktop.jpg';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const startNewOrder = () => {
    cartItems.splice(0, cartItems.length)
    console.log(cartItems);
  }

  const RemoveItems = (name) => {
    setCartItems((prev) => {
      return prev.filter((item)=> item.name !== name)
    })
  }

  const handleDecrease = (name) => {
    setCartItems((prev) => {
      return prev
      .map((item) =>
        item.name === name 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
      )
      .filter((item)=> item.quantity > 0 )
    });
  }

  const handleIncrease = (name) => {
    setCartItems((prev) => {
      return prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      );
    })
  }

  const handleOnClick = (name, price) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { name, price, quantity: 1 }];
      } 
    });
  };
  

  const imagePaths = {
    "Waffle with Berries": waffleImage,
    "Vanilla Bean Crème Brûlée": cremeBruleeImage,
    "Macaron Mix of Five": macaronImage,
    "Classic Tiramisu": tiramisuImage,
    "Pistachio Baklava": baklavaImage,
    "Lemon Meringue Pie": meringueImage,
    "Red Velvet Cake": cakeImage,
    "Salted Caramel Brownie": brownieImage,
    "Vanilla Panna Cotta": pannaCottaImage,
  };

  useEffect(()=> {
    setItems(Data)
   
  },[])

  useEffect(() => {
    console.log(cartItems); // Check if cartItems is empty after reset
  }, [cartItems]);  // This will log cartItems whenever it changes
  

  return (
    <div className='flex justify-between h-full p-10 gap-6'>
      <div className='w-4/5 '>
      <h2 className='text-5xl font-bold mb-6'>Desserts</h2>
        <div className='grid grid-cols-3 gap-6'>
        {items.map((Data)=>{
        const ImgSrc = imagePaths[Data.name]
        const { name, category, price}= Data;
        const isInCart = cartItems.find((item) => item.name === name);
        console.log(isInCart);
        return(
            <div key={name} className='relative'>
              <img src={ImgSrc} alt={name} className='rounded-lg'/>
              {
                  isInCart ? 
                  <button className='bg-rose-700 rounded-full border-gray-900 px-4 py-3 flex gap-6 justify-center content-center translate-y-[-50%] translate-x-[100%]'>  
                  <img src={Decrease} alt="Decrease Icon" className='rounded-full bg-rose-600 py-2 px-2 active:bg-white hover:bg-white' onClick={() => handleDecrease(name)}/>         
                  <p className='text-slate-200'>{isInCart.quantity}</p>        
                  <img src={Increase} alt="Increase Icon" className='rounded-full bg-rose-600 py-2 px-2 active:bg-white hover:bg-gray-400 ' onClick={() =>handleIncrease(name)}/>           
                  </button>
                  :
                  <button 
                  className='bg-white rounded-full border border-gray-900 px-4 py-3 flex gap-3 hover:border-rose-700 active:border-rose-800 hover:text-rose-700 translate-y-[-50%] translate-x-[100%]'
                  onClick={() => handleOnClick(name, price)}
                  id={name}
                  >
                <img src={cartIcon} alt="Cart Icon" />
                 <p className=''>Add to Cart</p>
                 </button>

              
              
              }
              <p className='text-rose-500'>{category}</p>
              <p>{name}</p>             
              <p className='text-rose-700'>${parseFloat(price).toFixed(2)}</p>
            </div>
            )
        })}
        </div>
      </div>
      <div className='w-1/5'>
        <Cart items={cartItems} onRemoveItems={RemoveItems} onNewOrder={startNewOrder}/>
      </div>
      
    </div>
  )
}
