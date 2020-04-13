import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, } from '@apollo/react-hooks'
import { client } from '../services/graphql'

const ALL_USERS = gql`
  {
    users {
      name 
      age
    }
  }
`

const CACHED_USERS = gql`
  {
    localUsers @client {
      name 
      age
    }
  }
`

const ADD_USER = gql`
  mutation addUser($name: String!, $age: Int){
    addUser( user: {
      name: $name
      age: $age
    }){
      name
      age
    }
  }
`

const ADD_LOCAL_USERS = gql`
  mutation addLocalUser($name: String!, $age: Int){
    addLocalUser( user: {
      name: $name
      age: $age
    }) @client {
      name
      age
    }
  }
`

export default () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState(null)

  const { error, loading, data } = useQuery(ALL_USERS)
  const { loading: cachedLoading, data: cachedUsers } = useQuery(CACHED_USERS)

  // mutation ke server dan update local cache
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [
      { query: ALL_USERS }
    ]
    // update: (proxy, { data: { addUser } }) => {
    //   const data = proxy.readQuery({ query: CACHED_USERS })
    //   // const newLocalUsers = data.localUsers.concat(addUser)
    //   data.localUsers.push(addUser)
    //   proxy.writeQuery({
    //     query: ADD_LOCAL_USERS,
    //     data
    //   })
    // }
  })

  if (loading) return <p> Loading....</p>
  if (error) return <p> {error.message} </p>

  const addNewUser = () => {
    addUser({
      variables: {
        name,
        age: +age
      }
    })
  }

  return (
    <div>
      <label> Name </label>
      <input onChange={e => setName(e.target.value)} type="text" />
      <br />
      <label> Age </label>
      <input onChange={e => setAge(e.target.value)} type="number" />
      <br />
      <button onClick={addNewUser}> Add User</button>
      <hr />

      {data.users.map((u, idx) => <p key={idx}> {u.name}</p>)}
      <hr />
      {cachedUsers.localUsers.map((u, idx) => <p key={idx}> {u.name}</p>)}
    </div>
  )
}