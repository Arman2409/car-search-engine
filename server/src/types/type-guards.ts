import { ErrorResult } from "src/types/global";

export const isErrorResult = (
    result: unknown | ErrorResult
): result is ErrorResult => {
    if(!result) return false;
    return result && typeof (result as ErrorResult).error === 'string';
}