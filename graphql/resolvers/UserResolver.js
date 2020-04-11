// users diganti dari database, ini cuma dummy data
const users = require('../../data/users')

const UserResolver = {
  Query: {
    users: () => {
      return users
    },
    getSingleUser: (_, args, context, info) => {
      const userId = args.userId
      const user = users.find(u => u.id == userId)
      return user
    }
  },
  Mutation: {
    addUser: (_, args) => {
      const newUser = {
        name: args.user.name,
        age: args.user.age
      }
      users.push(newUser)
      return newUser
    }
  }
}

module.exports = UserResolver