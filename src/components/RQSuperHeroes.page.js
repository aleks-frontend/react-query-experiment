import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  const [pollingInterval, setPollingInterval] = useState(false);
  const [heroName, setHeroName] = useState("");
  const [heroAlterEgo, setHeroAlterEgo] = useState("");

  const {
    mutate: addHero,
    isLoading: addHeroIsLoading,
    isError: addHeroIsError,
    error: addHeroError,
  } = useAddSuperHeroData()

  const onError = (error) => {
    toast("request failed, polling stopped", {
      icon: "🔴",
    });
    setPollingInterval(false);
  };

  const onSuccess = (data) => {
    if (data.length > 3) {
      toast("we have more than 3 heroes, polling stopped", {
        icon: "🦸‍♂️",
      });
      setPollingInterval(false);
    }
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onError,
      onSuccess,
      refetchInterval: pollingInterval,
    });

  const handleAddHeroClick = () => {
    addHero({
      name: heroName,
      alterEgo: heroAlterEgo,
    });
  };

  if (addHeroIsError) {
    return <h2>{addHeroError.message || 'add hero failed'}</h2>
  }

  console.log({error})

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
          <div>
            <label>
              Super hero name:
              <input
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Super hero alter ego:
              <input
                type="text"
                value={heroAlterEgo}
                onChange={(e) => setHeroAlterEgo(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleAddHeroClick} disabled={addHeroIsLoading}>
            Add hero
          </button>
          <button onClick={refetch}>Fetch super heroes</button>
          <h2>Super heroes RQ</h2>
          {data?.data.map((hero) => (
            <div key={hero.name} style={{ margin: "0 0 5px" }}>
              <Link to={`/super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
          ))}
        </>
      )}
      {isFetching && <p>Fetching data in the bg...</p>}
      <Toaster />
    </>
  );
};

export default RQSuperHeroesPage;
