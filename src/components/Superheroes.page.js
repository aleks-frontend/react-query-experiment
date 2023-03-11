import { useEffect, useState } from "react";
import axios from "axios";

const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        if (err.message) {
            setError(err.message);
        } else {
            setError("failed to fetch");
        }
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <h2>Super heroes</h2>
      {data && data.map((hero) => <div key={hero.name}>{hero.name}</div>)}
    </>
  );
};

export default SuperHeroesPage;
