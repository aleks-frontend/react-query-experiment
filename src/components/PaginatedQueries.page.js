import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ queryKey }) => {
  const pageNumber = queryKey[1];

  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    fetchColors,
    {
      keepPreviousData: true
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div>
      {data.data.map((color) => (
        <div key={color.id}>
          {color.id}. {color.label}
        </div>
      ))}
      <button
        disabled={pageNumber === 1 || isLoading || isFetching}
        onClick={() => setPageNumber((prevState) => prevState - 1)}
      >
        Prev
      </button>
      <button
        disabled={pageNumber === 4 || isLoading || isFetching}
        onClick={() => setPageNumber((prevState) => prevState + 1)}
      >
        Next
      </button>
      {isFetching && <p>Is fetching...</p>}
    </div>
  );
};

export default PaginatedQueriesPage;
