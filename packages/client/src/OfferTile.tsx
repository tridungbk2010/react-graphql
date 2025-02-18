interface OfferTileProps {
  name: string;
  visitedCount: number;
  price: string;
  imageUrl?: string;
  description?: string;
  clickHandler: () => void;
}

const OfferTile: React.FC<OfferTileProps> = ({
  name,
  visitedCount,
  price,
  imageUrl,
  description = "",
  clickHandler,
}) => {
  return (
    <div className="offer-tile">
      <section className="img" />
      <div className="">
        <h3 className="name">{name}</h3>
        <p className="price">{price}</p>
        <p className="description">{description}</p>
        <p className="visits">Visited: {visitedCount} times</p>
        <button onClick={clickHandler}>Visit now</button>
      </div>
    </div>
  );
};

export default OfferTile;
