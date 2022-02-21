export interface User {
    id?: number,
    username: string,
    age: number,
    email: string,
    password: string,
    friends: number[],
    library: number[]
}