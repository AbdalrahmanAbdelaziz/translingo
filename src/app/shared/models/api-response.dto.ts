export interface ApiResponseDTO<T>{
    statusCode: number;   
    succeeded: boolean;
    message: string;
    errors?: string[];     
    data?: T;      
}