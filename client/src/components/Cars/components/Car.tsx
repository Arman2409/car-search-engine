import { Card, CardContent, CardHeader } from "@mui/material";

import type { Car } from "../../../types/global";

const Car = ({ car }: { car: Car }) => {
    const { make, model, body_type } = car;

    return (
        <Card>
            <CardHeader>
                {`${make} ${model}`}
            </CardHeader>
            <CardContent>
                Body type: {body_type}
            </CardContent>
        </Card>)
}

export default Car;