export type registerData = {
    fullName: {
        firstName: string,
        lastName: string
    }
    phone: string;
    email: string;
    password: string;
    role: string
}   
export type errorMessage = {
    title: string;
    password: string;
}