import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const ALL_USERS = gql`
  {
    users{
      name 
      age
    }
  }
`

const SINGLE_USERS = gql`
    query getSingleUser($userId: Int!){
      getSingleUser(userId: $userId){
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

export default () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState(null)

  const { error, loading, data } = useQuery(ALL_USERS)
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [
      { query: ALL_USERS }
    ]
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
      <button onClick={addNewUser} > Add </button>

      <pre> {JSON.stringify(data, null, 2)} </pre>
    </div>
  )
}