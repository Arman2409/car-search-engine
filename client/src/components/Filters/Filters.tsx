import { useCallback, useContext, useState } from "react";
import { Button, Checkbox, MenuItem, Select, TextField } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

import styles from "./styles/Filters.module.scss";
import { Request } from "../../api/request";
import { FiltersContext } from "../../state/context";
import type { SelectFilter } from "../../types/components/filters";

const Filters = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);
    const { dispatch } = useContext(FiltersContext);

    const handleOpen = async (
        type: SelectFilter,
    ) => {
        const cachedData = sessionStorage.getItem(type);

        let result: string[] = [];

        if (cachedData) {
            result = JSON.parse(cachedData);
        } else {
            result = await Request.getInstance().getFilterData(type);
            sessionStorage.setItem(type, JSON.stringify(result));
        }

        if (typeof result === "object") {
            if (type === "models") {
                setModels(result);
            } else if (type === "makes") {
                setMakes(result);
            } else {
                setBodyTypes(result);
            }
        }
    }

    const handleApply = () => {

    }

    const selectFilterValue = (name: SelectFilter, value: string) => useCallback(() => {
        dispatch({
            for: name,
            payload: value
        })
    }, [dispatch])

    return (
        <>
            <div
                className="flex cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <h2>
                    Filters
                </h2>
                <ArrowDropDown
                    className={styles.filters_icon}
                    style={{
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: "transform 0.5s ease-in-out"
                    }} />
            </div>
            <div
                className={`${styles.filters_content} flex item-center transition overflow-hidden`}
                style={{
                    height: open ? '125px' : '0px',
                }}>
                <div className="w-[150px] flex flex-col gap-2 p-2">
                    <p>Filter by</p>
                    <div className="flex items-center">
                        <Checkbox
                            id="age"
                            size="small"
                            className="w-[10px] h-[10px]"
                        />
                        <label
                            htmlFor="age"
                            className="ml-2">
                            Age
                        </label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            id="price"
                            size="small"
                            className="w-[10px] h-[10px] mr-5"
                        />
                        <label
                            htmlFor="price"
                            className="ml-2">
                            Price
                        </label>
                    </div>
                </div>
                <div className="w-[225px] flex flex-col gap-2 p-2">
                    <label htmlFor="mark">Mark</label>
                    <Select
                        onOpen={() => handleOpen("makes")}
                        onChange={event => selectFilterValue("makes", String(event.target.value))}
                        className="w-[150px]"
                    >
                        {makes.map((make) => (
                            <MenuItem
                                key={make}
                                value={make}>
                                {make}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="w-[225px] flex flex-col gap-2 p-2">
                    <label htmlFor="mark">Model</label>
                    <Select
                        onOpen={() => handleOpen("models")}
                        onChange={event => selectFilterValue("models", String(event.target.value))}
                        className="w-[150px]"
                    >
                        {models.map((model) => (
                            <MenuItem
                                key={model}
                                value={model}>
                                {model}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="w-[225px] flex flex-col gap-2 p-2">
                    <label htmlFor="mark">Body type</label>
                    <Select
                        onOpen={() => handleOpen("bodyTypes")}
                        onChange={event => selectFilterValue("bodyTypes", String(event.target.value))}
                        className="w-[150px]"
                    >
                        {bodyTypes.map((bodyType) => (
                            <MenuItem
                                key={bodyType}
                                value={bodyType}>
                                {bodyType}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="w-[400px] flex flex-col gap-2 p-2">
                    <label htmlFor="price-min">Price</label>
                    <div className="flex gap-2 items-center">
                        <TextField
                            id="price-min"
                            placeholder="From..."
                            type="number"
                            className="w-[150px]"
                        />
                        -
                        <TextField
                            id="price-max"
                            placeholder="To..."
                            type="number"
                            className="w-[150px]"
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    className="w-[100px] h-[40px] bg-[#3f51b5] text-white"
                    onClick={handleApply}
                >
                    Apply
                </Button>
            </div>
        </>
    )
};

export default Filters;