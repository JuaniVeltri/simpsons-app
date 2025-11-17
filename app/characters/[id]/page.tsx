import { simpsonsApi } from "@/lib/api-client";
import { CharacterDetailPage } from "@/components/characters/character-detail-page";
import { notFound } from "next/navigation";

export default async function CharacterPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const search = await searchParams;
  const character = await simpsonsApi.getCharacter(parseInt(id));

  if (!character) {
    notFound();
  }

  // Get image from query param (passed from card) or fallback to API data
  const imagePath = (search.img as string) || character.portrait_path;

  return <CharacterDetailPage character={character} imagePath={imagePath} />;
}
