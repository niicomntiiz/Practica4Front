'use client';

import { useQuery } from "@apollo/client/react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { GET_CHARACTER } from "@/features/characters/queries";
import "./style.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CharacterPage({ params }: PageProps) {
  const { id } = use(params);

  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  const character = data?.character;

  return (
    <div className="mainContainer">
      <Link href="/" className="BotonVolver">← Volver al listado</Link>

      <h1>Detalle del personaje</h1>

      {loading && <h1>Cargando detalles...</h1>}
      {error && <h2 className="errorText">Error: {error.message}</h2>}

      {!loading && character && (
        <div className="detailContainer">
          {character.image && (
            <Image
              src={character.image}
              alt={character.name ?? "Character"}
              width={300}
              height={300}
              className="detailImg"
              priority
            />
          )}
          <h2>{character.name}</h2>
          <div className="detailFields">
            <p><strong>Estado:</strong> {character.status}</p>
            <p><strong>Especie:</strong> {character.species}</p>
            {character.gender && <p><strong>Género:</strong> {character.gender}</p>}
            {character.type && <p><strong>Tipo:</strong> {character.type}</p>}
            <p><strong>Origen:</strong> {character.origin?.name ?? "Desconocido"}</p>
            <p><strong>Última ubicación:</strong> {character.location?.name ?? "Desconocida"}</p>
          </div>
        </div>
      )}

      {!loading && !character && !error && (
        <h2>Personaje no encontrado.</h2>
      )}
    </div>
  );
}
