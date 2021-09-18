const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getPosts: [Post!]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Post {
    username: String!
    body: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    createdAt: String!
    token: String!
    email: String!
  }
`;
