import { createContext, SetStateAction } from "react";

import { Car } from "../types/global";

export interface State {
    cars: Car[];
}

interface ICarsContext {
    state: State,
    dispatch: React.Dispatch<SetStateAction<Car[]>>;
}

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);