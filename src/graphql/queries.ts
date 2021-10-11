/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      count
      contact
      callNumber1
      callUser1
      callNumber2
      callUser2
      callNumber3
      callUser3
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        count
        contact
        callNumber1
        callUser1
        callNumber2
        callUser2
        callNumber3
        callUser3
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
