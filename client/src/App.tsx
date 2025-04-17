import { useReducer, useState } from "react";

import Filters from "./components/Filters/Filters";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Searchbar from "./components/Searchbar/Searchbar";
import { FiltersContext, type State } from "./state/filters";
import { CarsContext } from "./state/cars";
import type { SelectFilter } from "./types/components/filters";
import type { Car } from "./types/global";

export interface Action {
  payload: string;
  for: SelectFilter;
}

const filtersReducer = (
  state: State,
  action: Action) => {

  console.log("dispatching", action);

  switch (action.for) {
    case "makes":
      return { ...state, make: action.payload };
    case "models":
      return { ...state, model: action.payload };
    case "bodyTypes":
      return { ...state, bodyType: action.payload };
    default:
      return state;
  }
}

const App = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, dispatchFilters] = useReducer(filtersReducer, {} as State);

  return (
    <FiltersContext.Provider value={{
      state: filters,
      dispatch: dispatchFilters
    }}>
      <CarsContext.Provider value={{
        state: { cars },
        dispatch: setCars
      }}>
        <Header />
        <Searchbar />
        <Filters />
        <Footer />
      </CarsContext.Provider>
    </FiltersContext.Provider>
  )
}

export default App;