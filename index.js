const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

connectDB();

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
