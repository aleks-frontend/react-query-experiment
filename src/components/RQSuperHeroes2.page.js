import React from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

const RQSuperHeroes2Page = () => {
  const { isLoading, isFetching, isError, error, data, refetch } = useSuperHeroesData({
    enabled: false
  });

  console.log(data)
  
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2 style={{ color: "red" }}>
          {error && error.message ? error.message : "Failed to fetch"}
        </h2>
      ) : (
        <>
          <h2>Super heroes RQ 2</h2>
          <button onClick={refetch}>refetch</button>
          {!!data && !!data.data && data.data.map((hero) => (
            <div key={hero.name}>{hero.name}</div>
          ))}
        </>
      )}
      {isFetching && <p>Fetching data in the bg...</p>}
    </>
  );
};

export default RQSuperHeroes2Page;
