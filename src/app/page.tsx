'use client';

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_CHARACTERS } from "@/features/characters/queries";
import { GetCharactersQuery, GetCharactersQueryVariables } from "@/gql/graphql";
import "./page.css";

const CharactersPage = () => {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <h1>Cargando personajes...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const info = data?.characters?.info;
  const characters = data?.characters?.results;

  return (
    <div className="mainContainer">
      <h1>Personajes de Rick y Morty</h1>

      <div className="charactersContainer">
        {characters?.map((character) => (
          <Link key={character?.id} href={`/character/${character?.id}`}>
            <div className="characterCard">
              <img 
                className="characterImg"
                src={character?.image ?? ""} 
                alt={character?.name ?? "Character"} 
              />
              <div className="characterData">
                <h2>{character?.name}</h2>
                <p>Estado: {character?.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="paginacionContainer">
        <button 
          className="BotonPaginar"
          disabled={!info?.prev} 
          onClick={() => setPage((p) => p - 1)}
        >
          ← Anterior
        </button>
        <span className="paginaInfo">Página {page} / {info?.pages}</span>
        <button 
          className="BotonPaginar"
          disabled={!info?.next} 
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;