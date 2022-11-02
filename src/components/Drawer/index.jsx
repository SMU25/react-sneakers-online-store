import React, { useContext } from "react";
import { Info } from "components/Info";
import { AppContext } from "context";
import { useCart } from "hooks/useCart";
import remove from "assets/btn-remove.svg";
import arrow from "assets/arrow.svg";
import completeOrder from "assets/complete-order.jpg";
import emptyCart from "assets/empty-cart.jpg";
import styles from "./Drawer.module.scss";

export const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { orders, onAddToOrders } = useContext(AppContext);

  const { setCartItems, totalPrice } = useCart();

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const orderId = orders.length;

  const onClickOrder = () => {
    setIsLoading(true);

    //simulation of loading
    setTimeout(() => {
      setIsOrderComplete(true);
      onAddToOrders();
      setCartItems([]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Кошик{" "}
          <img onClick={onClose} className="cu-p" src={remove} alt="Закрити" />
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
                    src={remove}
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
                Підтвердити замовлення! <img src={arrow} alt="Arrow" />
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
            image={isOrderComplete ? completeOrder : emptyCart}
          />
        )}
      </div>
    </div>
  );
};
