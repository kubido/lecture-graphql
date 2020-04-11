const { gql } = require('apollo-server-express')
const { merge } = require('lodash')

const { UserResolver } = require('./resolvers')
const { UserType } = require('./typeDefs')


// main typdef..kasih isi apa aja biar bisa di extends
const Root = gql`
  type Query{
    _root: String
  }

  type Mutation{
    _root: String
  }`

const context = () => {
  return {
    token: "kjHdkljgaldshg"
  }
}

// resolvers di merge manual menggunakan merge method dari lodash
// ini adalah cara sederhana, cara advance bisa menggunakan `makeExecutableSchema`
module.exports = {
  typeDefs: [Root, UserType],
  resolvers: merge(UserResolver),
  context: context
}
