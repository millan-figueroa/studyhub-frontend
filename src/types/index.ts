export interface User {
    _id: string;
    username: string;
    email: string;
    githubId?: string;
}

export interface Module {
    _id: string;
    name: string;
    description: string;
    user: string; // owner id
}

export interface Task {
    title: string;
    description: string;
    _id: string;
    status: string;
}