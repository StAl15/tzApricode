import React, {useState} from "react";
import {Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, Grid, Typography} from "@mui/material";
import {ModalWindow} from "@components/ui/modal/ModalWindow";
import todoStore, {filterMode} from "@store/Todo/todoStore";
import {ITodo} from "@models/todos/ITodo";
import {useMutation, useQuery} from "react-query";
import userStore from "@store/User/userStore";
import {ControlledRadioGroup} from "@components/ui/radioGroup/ControlledRadioGroup";
import styles from './index.module.scss'

import GridTodos from '@components/layouts/HomePage/GridTodos'

export const HomePage: React.FC<{}> = props => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [filter, setFilter] = useState<filterMode>(filterMode.all);

    const get = useQuery('todoData', () => todoStore.fetchTodos(), {
            refetchOnWindowFocus: false
        }
    )

    const handleSetFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((event.target as HTMLInputElement).value as filterMode);
    };

    const update = useMutation('todoUpdate', (id: number) => todoStore.completeTodo(id)
        .catch(err => console.log(err.message))
    )

    const remove = useMutation('todoDelete', (id: number) => todoStore.removeTodo(id)
        .catch(err => console.log(err.message))
    )


    return get.isLoading ? (
        <CircularProgress/>
    ) : (
        <div className={styles.content}>
            <h1>
                Home page!
            </h1>
            <Button className={styles.btnAddTodo} variant={'outlined'} onClick={() => handleOpen()}>Add new note</Button>
            <ModalWindow open={open} handleOpen={handleOpen} handleClose={handleClose}/>
            <ControlledRadioGroup filter={filter} handleSetFilter={handleSetFilter}/>
            <GridTodos update={update} remove={remove} filter={filter}/>
        </div>
    );
};