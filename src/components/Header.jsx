import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "hooks/useCart";
import logo from "assets/logo.png";
import cart from "assets/cart.svg";
import heart from "assets/heart.svg";
import user from "assets/user.svg";

export const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src={logo} alt="Logotype" />
          <div>
            <h3 className="text-uppercase">Sneakers - Online Store</h3>
            <p className="opacity-5">Магазин найкращих кросівок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src={cart} alt="Кошик" />
          <span>{totalPrice} грн.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src={heart} alt="Вподобання" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src={user} alt="Користувач" />
          </Link>
        </li>
      </ul>
    </header>
  );
};
