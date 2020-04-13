import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://localhost:3001/entertainme',
  clientState: {
    resolvers: {
      Mutation: {
        addLocalUser: (root, variables, c, d) => {
          console.log('-----masuk sini', root, variables, c, d)
        }
      }
    },
    defaults: {
      localUsers: [
        { name: "John Local Default", age: 30, __typename: "users" }
      ]
    }


  }
})
