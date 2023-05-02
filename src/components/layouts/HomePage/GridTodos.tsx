import React, {useState, FC} from "react";
import {Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, Grid, Typography} from "@mui/material";
import todoStore, {filterMode} from "@store/Todo/todoStore";
import {ITodo} from "@models/todos/ITodo";
import styles from './index.module.scss'

const GridTodos: FC<{update: any, remove: any, filter: filterMode}> = ({update, remove, filter}) => {
  return (
    <Grid className={styles.wrapper} container spacing={3}>
                {todoStore.todos.length > 0
                    ? todoStore.getFiltered(filter)
                        .map((todo, index) =>
                            <Grid className={styles.content} item key={todo.id} xs={12} sm={4}>
                                <Card variant={'outlined'} className={styles.card}>
                                    <CardContent className={styles.CardContent}>
                                        <Box display="flex" alignItems="center" className={styles.container}>
                                            <Typography>{todo.title}</Typography>
                                            <Checkbox checked={todo.completed} onChange={() => {
                                                update.mutate(todo.id);
                                            }} size="small"/>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button size={'small'} onClick={() => remove.mutate(todo.id)}>remove</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    : <h3 className={styles.nothing}>
                        Nothing found...
                    </h3>
                }
            </Grid>
  )
}

export default GridTodos
