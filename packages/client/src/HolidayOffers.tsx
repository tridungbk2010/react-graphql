import { gql, useQuery, TypedDocumentNode } from "@apollo/client";

type HolidayOffer = {
  id: string;
  name: string;
  visitedCount: number;
  dateAdded: string;
  price: {
    value: number;
    currency: string;
  };
  imageUrl: string;
  description: string;
};

const GET_HOLIDAY_OFFERS: TypedDocumentNode<{
  holidayOffers: HolidayOffer[];
}> = gql`
  query GetHolidayOffers {
    holidayOffers {
      id
      name
      visitedCount
      dateAdded
      description
      imageUrl
      price {
        value
        currency
      }
    }
  }
`;

export default function HolidayOffers() {
  const { data, error, loading } = useQuery(GET_HOLIDAY_OFFERS);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <section>
      {data?.holidayOffers.map((h) => (
        <div key={h.id}>
          <h3>{h.name}</h3>
          <span>{h.dateAdded}</span>
          <span>{h.visitedCount}</span>
          <div>
            {h.price.value} {h.price.currency}
          </div>
        </div>
      ))}
    </section>
  );
}
