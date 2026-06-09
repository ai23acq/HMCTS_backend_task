export interface TaskCreation{
    title: string;
    description?: string;
    dueDate: string;
}

export interface TaskUpdate{
    title?: string;
    description?: string;
    status?: "Pending" | "In_Progress" | "Completed";
    dueDate?: Date;
}