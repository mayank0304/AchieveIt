export interface Task {
    "id": number;
    "title": string;
    "isCompleted": boolean; 
}

export interface Project {
    "id": number;
    "projectName": string;
    "projectDescription": string;
    "projectTasks": Task[];
    "isProjectCompleted": boolean;
}