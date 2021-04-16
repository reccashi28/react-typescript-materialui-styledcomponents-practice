import { useQuery } from 'react-query';
import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Wrapper } from './App.style';

import Item from './components/Items/Items';
import Home from './components/home/Home';

export type CartItemType = {
  id: number
  category: string 
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => 
  await ( await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
   const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = () => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if(isLoading) return <CircularProgress />
  if(error) return <div>Something went wrong!</div>

  return (
    <>
     <Wrapper>
       <Home />
       <Drawer anchor='right' open={cartOpen} onClose = { () => setCartOpen(false)}>
          Cart goes here.
       </Drawer>
       <Grid container spacing={3}>
          {data?.map( item => (
            <Grid item key ={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
       </Grid>
     </Wrapper>
    </>
  );
}

export default App;
