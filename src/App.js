import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import SuperHeroesPage from "./components/Superheroes.page";
import HomePage from "./components/Home.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import RQSuperHeroes2Page from "./components/RQSuperHeroes2.page";
import RQSuperHeroPage from './components/RQSuperHero.page';
import RQDynamicParallelQueries from "./components/RQDynamicParallelQueries.page";
import RQDependentPage from './components/RQDependent.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfiniteQueriesPage from './components/InfiniteQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes2">RQ Super Heroes 2</Link>
            </li>
          </ul>
        </nav>
        <div style={{ padding: "0 10px" }}>
          <Routes>
            <Route path="/super-heroes/:heroId" element={<RQSuperHeroPage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-super-heroes2" element={<RQSuperHeroes2Page />} />
            <Route path="/rq-dynamic-parallel" element={<RQDynamicParallelQueries heroIds={[1, 2]} />} />
            <Route path="/rq-dependent" element={<RQDependentPage userId={1} />} />
            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
            <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
