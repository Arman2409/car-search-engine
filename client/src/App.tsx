import { useEffect, useReducer } from "react"
import Filters from "./components/Filters/Filters"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Searchbar from "./components/Searchbar/Searchbar"
import { FiltersContext, type State } from "./state/context"
import type { SelectFilter } from "./types/components/filters"

// export enum ActionType = "SET_MAKES" | "SET_MODELS" | "SET_BODY_TYPES";

export interface Action {
  payload: string;
  for: SelectFilter;
}

const filtersReducer = (state: State, action: Action) => {
  console.log("received for dispatch");
  
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
  const [filters, dispatchFilters] = useReducer(filtersReducer, {} as State);

  useEffect(() => {
    console.log({ filters });
    
  }, [filters])
  return (
    <FiltersContext.Provider value={{
      state: filters,
      dispatch: dispatchFilters
    }}>
      <Header />
      <Searchbar />
      <Filters />
      <Footer />
    </FiltersContext.Provider>
  )
}

export default App;