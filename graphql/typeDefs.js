const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getPosts: [Post!]
    getPost(postId: ID!): Post!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User
    createPost(body: String!): Post!
    deletePost(postId: ID): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID): Post!
    likePost(postId: ID): Post!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type User {
    id: ID!
    username: String!
    createdAt: String!
    token: String!
    email: String!
  }

  type Comment {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
`;
