import { useContext, useEffect } from "react";

import { CarsContext } from "../../state/cars";
import Car from "./components/Car";
import type { Car as CarType } from "../../types/global";

const Cars = () => {
    const { cars } = useContext(CarsContext)

    return (
        <div className="flex flex-wrap flex-wrap-l gap-4 justify-between items-center bg-gray-800 p-4">
            {cars.map((car: CarType) => <Car car={car} />)}
        </div>
    );
}

export default Cars;