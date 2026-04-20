'use client';

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_CHARACTER } from "@/features/characters/queries";
import { GetCharacterQuery, GetCharacterQueryVariables } from "@/gql/graphql";
import styles from "./style.module.css";

const CharacterDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, loading, error } = useQuery<GetCharacterQuery, GetCharacterQueryVariables>(GET_CHARACTER, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <h1>Cargando detalles...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const character = data?.character;

  return (
    <div className={styles.detailContainer}>
      <Link href="/" style={{ marginBottom: '20px', display: 'block' }}>← Volver</Link>

      {character && (
        <>
          <h1>Nombre: {character.name}</h1>
          <img 
            src={character.image ?? ""} 
            alt={character.name ?? "Character"} 
          />
          <p>Especie: {character.species}</p>
          <p>Estado: {character.status}</p>
          <p>Origen: {character.origin?.name ?? "Desconocido"}</p>
        </>
      )}
    </div>
  );
};

export default CharacterDetailPage;