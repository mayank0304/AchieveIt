export interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    notificationId?: string; // Add this!
}

export interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectTasks: Task[];
    isProjectCompleted: boolean;
}