import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { BOOKS, HOLIDAY_OFFERS } from "./constants";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Price {
    value: Float!
    currency: String!
  }

  type HolidayOffer {
    id: ID!
    name: String!
    visitedCount: Int!
    dateAdded: String!
    price: Price!
    imageUrl: String
    description: String
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book],
    holidayOffers: [HolidayOffer]
  }

  type Mutation {
    markVisited(offerId: String!): HolidayOffer
  }
`;

const resolvers = {
  Query: {
    books: () => BOOKS,
    holidayOffers: () => HOLIDAY_OFFERS,
  },
  Mutation: {
    markVisited: (_: any, { offerId }: { offerId: string }) => {
      const offerIndex = HOLIDAY_OFFERS.findIndex((of) => of.id === offerId);

      if (offerIndex === -1) {
        throw new Error("can not update");
      }

      HOLIDAY_OFFERS[offerIndex] = {
        ...HOLIDAY_OFFERS[offerIndex],
        visitedCount: HOLIDAY_OFFERS[offerIndex].visitedCount + 1,
      };

      return HOLIDAY_OFFERS[offerIndex];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
