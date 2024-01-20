export interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
}

export interface User extends UserDTO{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

