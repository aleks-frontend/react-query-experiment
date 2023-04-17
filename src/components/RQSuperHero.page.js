import React from "react";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  const { data, isLoading, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  
  return <div>{data.data.name} - {data.data.alterEgo}</div>;
};

export default RQSuperHeroPage;
