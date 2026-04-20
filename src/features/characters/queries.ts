import { graphql } from "@/gql";

export const GET_CHARACTERS = graphql(`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
        species
      }
    }
  }
`);

export const GET_CHARACTER = graphql(`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      image
      gender
      type
      origin {
        name
      }
      location {
        name
      }
    }
  }
`);
