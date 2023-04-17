import { useQuery } from "react-query";
import { axiosRequest } from '../utils/axios-utils';

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  // return axios(`http://localhost:4000/superheroes/${heroId}`);
  return axiosRequest({ url: `/superheroes/${heroId}` })
};

export const useSuperHeroData = (heroId) =>
  useQuery(["super-hero-data", heroId], fetchSuperHero);
