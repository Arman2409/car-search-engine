import type { Car } from "../global";

export interface CarSearchCriteria extends Partial<Car> {
    page?: number;
    size?: number;
    name?: string;
}
