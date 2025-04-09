import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";

import styles from "./styles/Filters.module.scss";

const Filters = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className="flex cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <h2 >
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
                        id="mark"
                        className="w-[150px]"
                    >
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="Mercedes">Mercedes</MenuItem>
                        <MenuItem value="Audi">Audi</MenuItem>
                    </Select>
                </div>
                <div className="w-[225px] flex flex-col gap-2 p-2">
                    <label htmlFor="mark">Model</label>
                    <Select
                        id="mark"
                        className="w-[150px]"
                    >
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="Mercedes">Mercedes</MenuItem>
                        <MenuItem value="Audi">Audi</MenuItem>
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
                <div className="w-[250px] flex flex-col gap-2 p-2">
                    <label htmlFor="age">Year</label>
                    <Select
                        id="mark"
                        className="w-[150px]"
                    >
                        <MenuItem value="">...</MenuItem>
                        <MenuItem value="1999">1999</MenuItem>
                        <MenuItem value="2000">2000</MenuItem>
                        <MenuItem value="2001">2001</MenuItem>
                    </Select>
                </div>
            </div>
        </>
    )
};

export default Filters;