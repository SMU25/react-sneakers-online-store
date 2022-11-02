import React from "react";
import { AppContext } from "context";
import { Card } from "components/Card";

const Orders = () => {
  const {
    orders = [],
    onAddToFavorite,
    onAddToCart,
  } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої замовлення</h1>
        {!orders.length && <p>Ви ще нічого не замовляли.</p>}
      </div>

      <div>
        {orders.map(({ orderId, items }) => (
          <div key={orderId}>
            <h2>Замовлення {orderId}</h2>
            <div className="d-flex flex-wrap">
              {items.map((item) => (
                <Card
                  key={item.id + new Date().getTime()}
                  onFavorite={onAddToFavorite}
                  onPlus={onAddToCart}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
