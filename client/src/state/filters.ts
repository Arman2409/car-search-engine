import { ActionDispatch, createContext } from "react";

import type { Action } from "../App";

export interface FiltersState {
    make: string;
    model: string;
    bodyType: string;
}

interface IFiltersContext {
    filters: FiltersState,
    dispatchFilters: ActionDispatch<[action: Action]>;
}

export const FiltersContext = createContext<IFiltersContext>({} as IFiltersContext);