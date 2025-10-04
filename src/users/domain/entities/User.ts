export interface User {
    id?: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    email: string;
    password_hash: string;
    rol_id: number;
    avatar: number;
    fecha_registro?: Date;
}