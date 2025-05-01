import { createContext, SetStateAction } from "react";

import { Car } from "../types/global";

interface ICarsContext {
    cars: Car[],
    dispatchCars: React.Dispatch<SetStateAction<Car[]>>;
}

export const CarsContext = createContext<ICarsContext>({} as ICarsContext);