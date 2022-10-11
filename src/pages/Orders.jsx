import React from "react";
import axios from "axios";
import { AppContext } from "context";
import { Card } from "components/Card";
import { API_URL_ORDERS } from "constants/urls";

const Orders = () => {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(API_URL_ORDERS);
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Помилка при запиті замовлень");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої замовлення</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            onFavorite={onAddToFavorite}
            onPlus={onAddToCart}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
