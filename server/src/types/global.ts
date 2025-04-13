export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    body_type: string;
    name?: string;
}

export interface ErrorResult {
    error: string;
}