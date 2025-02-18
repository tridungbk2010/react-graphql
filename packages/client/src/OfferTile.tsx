interface OfferTileProps {
  name: string;
  visitedCount: number;
  price: string;
  imageUrl?: string;
  description?: string;
  dateAdded?: string;
  clickHandler: () => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const formatWithTimezone = (dateString: string, timezone: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    timeZone: timezone,
    // Date options
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // Time options
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // or false for 24-hour format
  });
};

const OfferTile: React.FC<OfferTileProps> = ({
  name,
  visitedCount,
  price,
  imageUrl,
  description = "",
  clickHandler,
  dateAdded,
}) => {
  return (
    <div className="offer-tile">
      <section className="img" />
      <div className="">
        <h3 className="name">{name}</h3>
        <p className="dateAdded">
          {formatWithTimezone(dateAdded || "", "Asia/Ho_Chi_Minh")}
        </p>
        <p className="price">{price}</p>
        <p className="description">{description}</p>
        <p className="visits">Visited: {visitedCount} times</p>
        <button onClick={clickHandler}>Visit now</button>
      </div>
    </div>
  );
};

export default OfferTile;
