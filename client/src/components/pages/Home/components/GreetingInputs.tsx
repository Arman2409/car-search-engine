import { useCallback, useState } from "react";
import { Alert, Button, Input, Snackbar } from "@mui/material"

const GreetingInputs = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");

    const onFinish = () => {
        if (!name) {
            setAlertMessage("Please enter your name");
            return;
        }
        if (!surname) {
            setAlertMessage("Please enter your surname");
            return;
        }
        alert(`Hello ${name} ${surname}`)
    }

    const onNameChane = useCallback((value: string) => {
        setName(value)
    }, [setName])

    const onSurnameChane = useCallback((value: string) => {
        setSurname(value)
    }, [setSurname])

    return (
        <div className="w-[200px] h-[350px] flex-col">
            <Input
                placeholder="Enter your name"
                onChange={e => onNameChane(e.target.value)}
            />
            <Input
                placeholder="Enter your surname"
                onChange={e => onSurnameChane(e.target.value)}
            />
            <Button onClick={onFinish}>
                Finish
            </Button>
            <Snackbar open={Boolean(alertMessage)} autoHideDuration={2000} onClose={() => setAlertMessage("")}>
                <Alert severity="warning">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GreetingInputs;