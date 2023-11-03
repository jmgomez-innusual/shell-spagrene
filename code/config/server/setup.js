module.exports = (server) => {
  // MOCKED SERVICE
  server.get("/SPAGRENE/api/wscproducts/v1/products", (_, res) => {
    setTimeout(() => {
      res.json(
        Array(10)
          .fill(null)
          .map((_, index) => ({
            id: `id-${index}`,
            name: `Product ${index}`,
          })),
      );
    }, 1000);
  });

  // // To support GraphQL it's possible to integrate Apollo Server into the mock.
  // // All the required dependencies must be added to the project.
  // const { ApolloServer, gql } = require("apollo-server-express"); // eslint-disable-line global-require

  // const typeDefs = gql`
  //   type Query {
  //     greeting: String
  //   }
  // `;

  // const resolvers = {
  //   Query: {
  //     greeting: () => "hello world",
  //   },
  // };

  // const graphqlServer = new ApolloServer({ typeDefs, resolvers });
  // graphqlServer.applyMiddleware({ app: server });
  // console.log(`  >> GrapqQL endpoint: ${graphqlServer.graphqlPath}\n`); // eslint-disable-line no-console
};
