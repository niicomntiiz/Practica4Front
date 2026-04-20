'use client';

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import Image from "next/image";
import { GET_CHARACTERS } from "@/features/characters/queries";
import "./page.css";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  const info = data?.characters?.info;
  const characters = data?.characters?.results;

  return (
    <div className="mainContainer">
      <h1>Rick & Morty Characters</h1>

      {error && <h2 className="errorText">Error: {error.message}</h2>}
      {loading && <h1>Cargando...</h1>}

      {!loading && (
        <>
          <div className="charactersContainer">
            {characters?.map((character) => {
              if (!character) return null;
              return (
                <Link key={character.id} href={`/character/${character.id}`}>
                  <div className="characterCard">
                    {character.image && (
                      <Image
                        src={character.image}
                        alt={character.name ?? "Character"}
                        width={180}
                        height={180}
                        className="characterImg"
                      />
                    )}
                    <div className="characterData">
                      <h2>{character.name}</h2>
                      <p>
                        <span
                          className="statusDot"
                          style={{
                            backgroundColor:
                              character.status === "Alive"
                                ? "#4caf50"
                                : character.status === "Dead"
                                ? "#f44336"
                                : "#9e9e9e",
                          }}
                        />
                        {character.status} — {character.species}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="paginacionContainer">
            <button
              className="BotonPaginar"
              disabled={!info?.prev}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Anterior
            </button>
            <span className="paginaInfo">
              Página {page} / {info?.pages ?? "?"}
            </span>
            <button
              className="BotonPaginar"
              disabled={!info?.next}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
