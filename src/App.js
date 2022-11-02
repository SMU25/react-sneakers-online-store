import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router";
import Home from "pages/Home";
import Favorites from "pages/Favorites";
import Orders from "pages/Orders";
import { Header } from "components/Header";
import { Drawer } from "components/Drawer";
import { AppContext } from "context";
import { getItemLocalStorage } from "utils/getItemLocalStorage";
import { setItemLocalStorage } from "utils/setItemLocalStorage";
import { API_URL_ITEMS } from "constants/urls";
import {
  SNEAKERS_CART_KEY,
  SNEAKERS_FAVORITES_KEY,
  SNEAKERS_ORDERS_KEY,
} from "constants/localStorage";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState(
    getItemLocalStorage(SNEAKERS_CART_KEY)
  );
  const [favorites, setFavorites] = React.useState(
    getItemLocalStorage(SNEAKERS_FAVORITES_KEY)
  );
  const [orders, setOrders] = React.useState(
    getItemLocalStorage(SNEAKERS_ORDERS_KEY)
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(API_URL_ITEMS);

        setIsLoading(false);
        setItems(data);
      } catch (error) {
        console.error(error);
        alert("Помилка при запиті данних;(");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    const findItem = cartItems?.find(
      (item) => Number(item.id) === Number(obj.id)
    );

    if (findItem) {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onAddToFavorite = async (obj) => {
    if (favorites?.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      setFavorites((prev) => [...prev, obj]);
    }
  };

  const onAddToOrders = () =>
    setOrders((prev) => [
      ...prev,
      { orderId: orders?.length + 1, items: cartItems },
    ]);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setItemLocalStorage(cartItems, SNEAKERS_CART_KEY);
  }, [cartItems]);

  useEffect(() => {
    setItemLocalStorage(favorites, SNEAKERS_FAVORITES_KEY);
  }, [favorites]);

  useEffect(() => {
    setItemLocalStorage(orders, SNEAKERS_ORDERS_KEY);
  }, [orders]);

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        orders,
        onAddToFavorite,
        onAddToCart,
        onAddToOrders,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route path="favorites" element={<Favorites />} exact />
          <Route path="orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
