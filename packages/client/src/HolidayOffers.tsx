import { gql, useQuery, TypedDocumentNode, useMutation } from "@apollo/client";
import OfferTile from "./OfferTile";

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

const MARK_VISIT_COUNT = gql`
  mutation MarkVisited($offerId: String!) {
    markVisited(offerId: $offerId) {
      id
      visitedCount
      name
      description
      dateAdded
    }
  }
`;

export default function HolidayOffers() {
  const { data, error, loading } = useQuery(GET_HOLIDAY_OFFERS);

  const [markVisited] = useMutation(MARK_VISIT_COUNT, {
    update: (cache, { data: { markVisited } }) => {
      cache.modify({
        fields: {
          holidayOffers(existingOffers = [], { readField }) {
            return existingOffers.map((offerRef: any) => {
              if (readField("id", offerRef) === markVisited.id) {
                // Merge the existing reference with updated fields
                return cache.writeFragment({
                  id: cache.identify(offerRef),
                  fragment: gql`
                    fragment UpdatedOffer on HolidayOffer {
                      id
                      visitedCount
                      name
                      description
                      dateAdded
                    }
                  `,
                  data: markVisited,
                });
              }
              return offerRef;
            });
          },
        },
      });
    },
  });

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <section className="holiday-offers">
      {data?.holidayOffers.map((h) => (
        <OfferTile
          key={h.id}
          name={h.name}
          visitedCount={h.visitedCount}
          price={`${h.price.value} ${h.price.currency}`}
          imageUrl={h.imageUrl}
          description={h.description}
          clickHandler={() => {
            markVisited({
              variables: {
                offerId: h.id,
              },
            });
          }}
        />
      ))}
    </section>
  );
}
