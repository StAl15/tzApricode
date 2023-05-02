import React, {useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import todoStore from "@store/Todo/todoStore";
import {ITodo} from "@models/todos/ITodo";
import styles from './index.module.scss'

export const ModalWindow: React.FC<{ open: boolean, handleOpen: VoidFunction, handleClose: VoidFunction }> = props => {
    const [todoText, setTodoText] = useState('');

    const handleAction = () => {
        todoStore.addTodo(todoText)
        props.handleClose()
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        minWidth: 250,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
    };

    return (
        <div className={styles.wrapper}>
            <Modal
                className={styles.modal}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box bgcolor={'background.paper'} boxShadow={24} sx={style} className={styles.content}>
                    <TextField placeholder={'Enter todo...'} fullWidth onChange={(e) => setTodoText(e.target.value)}/><br/>
                    <br/>
                    <Box width='100%' display="flex" justifyContent="space-between">
                        <Button variant={'outlined'} onClick={props.handleClose}>Close</Button>
                        <Button disableElevation={true} variant={'contained'}
                                onClick={() => handleAction()}>send</Button>
                    </Box>

                </Box>

            </Modal>
        </div>
    );
};