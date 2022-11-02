import React from "react";
import { AppContext } from "context";
import { Card } from "components/Card";

const Favorites = () => {
  const { favorites = [], onAddToFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої вподобання</h1>
        {!favorites.length && <p>Ви ще нічого не додали сюди.</p>}
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card key={index} onFavorite={onAddToFavorite} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
