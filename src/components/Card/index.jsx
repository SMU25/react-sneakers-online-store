import React from "react";
import { AppContext } from "context";
import { ContentLoaderComponent } from "components/ContentLoader";
import liked from "assets/liked.svg";
import unliked from "assets/unliked.svg";
import checked from "assets/btn-checked.svg";
import plus from "assets/btn-plus.svg";
import styles from "./Card.module.scss";

export const Card = ({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited,
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoaderComponent />
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorite ? liked : unliked}
                alt={isFavorite ? "Liked" : "Unliked"}
              />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Ціна:</span>
              <b>{price} грн.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? checked : plus}
                alt={isItemAdded(id) ? "Check" : "Plus"}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
