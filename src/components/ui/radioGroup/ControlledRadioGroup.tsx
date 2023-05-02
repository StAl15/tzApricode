import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {filterMode} from "@store/Todo/todoStore";
import React, {ChangeEvent, SetStateAction, useEffect} from "react";

export const ControlledRadioGroup: React.FC<{
    filter: string,
    handleSetFilter: (event: ChangeEvent<HTMLInputElement>) => void
}> = ({
          filter,
          handleSetFilter
      }) => {


    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Filter</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                value={filter}
                onChange={handleSetFilter}
                name="filters"
            >
                <FormControlLabel value={filterMode.all} control={<Radio/>} label={filterMode.all}/>
                <FormControlLabel value={filterMode.done} control={<Radio/>} label={filterMode.done}/>
                <FormControlLabel value={filterMode.undone} control={<Radio/>} label={filterMode.undone}/>
            </RadioGroup>
        </FormControl>
    );
};