import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { axiosRequest } from '../utils/axios-utils';

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return axiosRequest({ url: "/superheroes" });
};

export const useSuperHeroesData = (config) => {
  return useQuery("super-heroes", fetchSuperHeroes, config);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (hero) =>
    // axios.post("http://localhost:4000/superheroes", hero),
      axiosRequest({ url: "/superheroes", method: "post", data: hero }),
    {
      onSuccess: (responseData) => {
        // queryClient.invalidateQueries('super-heroes');
        queryClient.setQueryData('super-heroes', (oldQueryData) => {
          return ({
            ...oldQueryData,
            data: [...oldQueryData.data, responseData.data]
          })
        })
      },
    });
}
