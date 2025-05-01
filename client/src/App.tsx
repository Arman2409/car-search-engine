import { useReducer, useState } from "react";

import { FiltersContext, type FiltersState } from "./state/filters";
import { CarsContext } from "./state/cars";
import Filters from "./components/Filters/Filters";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Searchbar from "./components/Searchbar/Searchbar";
import Cars from "./components/Cars/Cars";
import type { SelectFilter } from "./types/components/filters";
import type { Car } from "./types/global";

export interface Action {
  payload: string;
  for: SelectFilter;
}

const filtersReducer = (
  state: FiltersState,
  action: Action) => {

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
  const [filters, dispatchFilters] = useReducer(filtersReducer, {} as FiltersState);

  return (
    <FiltersContext.Provider value={{
      filters: filters,
      dispatchFilters: dispatchFilters
    }}>
      <CarsContext.Provider value={{
        cars: cars,
        dispatchCars: setCars
      }}>
        <Header />
        <Searchbar />
        <Filters />
        <Cars />
        <Footer />
      </CarsContext.Provider>
    </FiltersContext.Provider>
  )
}

export default App;