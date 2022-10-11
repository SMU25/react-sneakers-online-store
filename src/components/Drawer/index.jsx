import React from "react";
import axios from "axios";
import { Info } from "components/Info";
import { useCart } from "hooks/useCart";
import { API_URL_CART, API_URL_ORDERS } from "constants/urls";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(API_URL_ORDERS, {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      await cartItems.forEach((item) => {
        axios.delete(`${API_URL_CART}/${item.id}`);
        delay(1000);
      });
    } catch (error) {
      console.log(error);
      alert("Помилка при створенні замовлення :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Кошик{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn-remove.svg"
            alt="Закрити"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className={"items flex " + styles.containerItems}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Всього:</span>
                  <div />
                  <b>{totalPrice} грн. </b>
                </li>
                <li>
                  <span>Податок 20%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 20} грн. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Підтвердити замолвення! <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Замовлення оформлене!" : "Кошик пустий"}
            description={
              isOrderComplete
                ? `Дякуємо. Ваше замовлення #${orderId} найближчим часом буде передано до кур'єрської служби доставки.`
                : "Додайте хоча б одну (1) пару кросівок, щоб зробити замовлення! "
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};
