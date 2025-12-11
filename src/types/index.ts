export interface User {
    _id: string;
    username: string;
    email: string;
    githubId?: string;
}

export interface Module {
    _id: string;
    title: string;
    description: string;
    user: string; // owner id
}

export type Task = {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate?: string;
};



export interface Tasks {
    _id: string;
    name: string;
    description: string;
    status: "todo" | "in-progress" | "done";
}

export type Status = "todo" | "in-progress" | "done";
export interface TasksDashboardProps {
    moduleId: string;
}

export interface TaskListProp {
    tasks: Tasks[];
    editTask: (
        id: string,
        name: string,
        description: string,
        status: Status
    ) => void;
    deleteTask: (id: string) => void;
}