export interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    notificationId?: string;
}

export interface Project {
    id: number;
    projectName: string;
    projectTasks: Task[];
    notificationId?: string;
}