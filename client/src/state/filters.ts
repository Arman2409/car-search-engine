import { ActionDispatch, createContext } from "react";

import type { Action } from "../App";

export interface State {
    make: string;
    model: string;
    bodyType: string;
}

interface IFiltersContext {
    state: State,
    dispatch: ActionDispatch<[action: Action]>;
}

export const FiltersContext = createContext<IFiltersContext>({} as IFiltersContext);