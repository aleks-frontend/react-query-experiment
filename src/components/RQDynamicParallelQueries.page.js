import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios(`http://localhost:4000/superheroes/${heroId}`);
};

const RQDynamicParallelQueries = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ["super-hero", id],
      queryFn: () => fetchSuperHero(id),
    }))
  );

  return (
    <div>
      {queryResults &&
        queryResults.map((result, index) => {
          if (result.isLoading) {
            return <p key={index}>Loading...</p>;
          }

          if (result.isError) {
            return <p key={index}>{result.error.message}</p>;
          }

          return (
            <p key={index}>
              {result.data.data.name} - {result.data.data.alterEgo}
            </p>
          );
        })}
    </div>
  );
};

export default RQDynamicParallelQueries;
