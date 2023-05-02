
export interface ITodo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

export interface ITodoGen {
    todo?: ITodo;
}

export interface ITodos {
    todos?: ITodo[];
}