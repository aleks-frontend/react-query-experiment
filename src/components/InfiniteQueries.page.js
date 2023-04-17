import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(["colors"], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <>
      <div>
        {data?.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
                {page.data.map(color => (
                    <div key={color.id}>{color.id}. {color.label}</div>
                ))}
            </Fragment>
        ))}
      </div>
      <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>
      {isFetching && !isFetchingNextPage && <p>Fetching...</p>}
    </>
  );
};

export default InfiniteQueriesPage;
