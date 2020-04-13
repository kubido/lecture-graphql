const { gql } = require('apollo-server-express')

const UserType = gql`
  type User{
    id: ID
    name: String
    age: Int
  }

  input UserInput{
    name: String!
    age: Int 
  }

  extend type Query{
    users: [User]
    getSingleUser(userId: Int!): User
  }

  extend type Mutation{
    addUser( user: UserInput ): User
  }
`

module.exports = UserType