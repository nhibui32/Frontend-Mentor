import React from 'react'
import { useState, useEffect } from 'react'
import removeIcon from '../assets/images/icon-remove-item.svg'
import emptyCartImg from '../assets/images/illustration-empty-cart.svg'
import waffleImage from '../assets/images/image-waffle-desktop.jpg';
import cremeBruleeImage from '../assets/images/image-creme-brulee-desktop.jpg';
import macaronImage from '../assets/images/image-macaron-desktop.jpg';
import tiramisuImage from '../assets/images/image-tiramisu-desktop.jpg';
import baklavaImage from '../assets/images/image-baklava-desktop.jpg';
import meringueImage from '../assets/images/image-meringue-desktop.jpg';
import cakeImage from '../assets/images/image-cake-desktop.jpg';
import brownieImage from '../assets/images/image-brownie-desktop.jpg';
import pannaCottaImage from '../assets/images/image-panna-cotta-desktop.jpg';

export default function Cart({items, onRemoveItems, onNewOrder}) {
  const[inCart, setInCart] = useState([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleStartNewOrder = () => {
    console.log("Clearing cart...");
    inCart.splice(0, inCart.length);
    setIsOrderConfirmed(false);
  }
  useEffect(()=>{
    setInCart(items);
  },[items])

  const removeItems = (name) =>{
    onRemoveItems(name);
  }

  

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

  const handleConfirm = () => {
    setIsOrderConfirmed(true)
  }

  const orderTotal = inCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  const totalQuantity = inCart.reduce((total,item) => total += item.quantity,0)
  return (
    <div className='text-3xl bg-slate-100 p-6 rounded-lg'>
      <h2 className='text-rose-700 text-3xl mb-3'>Your Cart ({totalQuantity})</h2>
      {totalQuantity === 0 ?
      <div className='flex flex-col justify-center items-center'>
        <img src={emptyCartImg} alt="Empty Cart Image" className='' />
        <p className='text-rose-400 text-lg'>Your added items will appear here</p>
      </div>
      : (
        <div>
          {inCart.map((item, index) => {
            const ImgSrc = imagePaths[item.name];
            const { name, price, quantity } = item;
            const itemTotal = (price * quantity).toFixed(2);
            return (
              <div key={index} className='flex justify-between items-center mb-4 border-b pb-3 border-gray-400'>
                <div>
                  <p>{name}</p>
                  <div className='flex gap-3'>
                    <p className='text-rose-700'>{quantity}x</p>
                    <p className='text-rose-400'>@${parseFloat(price).toFixed(2)}</p>
                    <p className='text-rose-500'>${itemTotal}</p>
                  </div>
                </div>
                <div>
                  <img src={removeIcon} alt="Remove Items Icon" className='w-5 h-5 rounded-full border border-gray-800' onClick={() => removeItems(name)} />
                </div>
              </div>
            );
          })}
          <div className=''>
            <div className='flex justify-between'>
              <p>Order Total:</p>
              <p className='font-bold'>${orderTotal}</p>
            </div>
            <button className='w-full bg-rose-700 mt-3 rounded-full hover:text-white hover:bg-rose-800 p-3' onClick={handleConfirm}>Submit Order</button>
          </div>
        </div>
      )}

      {isOrderConfirmed && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-xl font-bold">Order Confirmed</h2>
      <p className='text-rose-500 text-sm'>We hope you enjoy your food!</p>
      <div className='bg-eggshell p-6 mt-3 mb-3  rounded-xl'>
      {inCart.map((item, index) => {
        const ImgSrc = imagePaths[item.name];
        const { name, price, quantity } = item;
        const itemToTal = (price * quantity).toFixed(2);
        return (
          <div key={index} className="flex gap-6 items-center mb-4 border-b pb-3 border-gray-400">
            <img src={ImgSrc} alt={name} className="w-16 h-16 object-cover" />
            <div>
              <p>{name}</p>
              <div className="flex gap-3">
                <p>{quantity}x</p>
                <p>@${parseFloat(price).toFixed(2)}</p>
                <p>${itemToTal}</p>
              </div>
            </div>           
          </div>
        );
      })}
      <div className="flex justify-between">
        <p className="font-bold">Order Total:</p>
        <p className="font-bold">${orderTotal}</p>
      </div>
      </div>
      <button className='text-white bg-red-700 item w-full rounded-full mt-3 p-3 hover:bg-red-800 active:bg-red-800'
      onClick={handleStartNewOrder}
      >Start New Order</button>
    </div>
  </div>
)}

    </div>
  )
}
