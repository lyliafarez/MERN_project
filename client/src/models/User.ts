export default class User {
    
    name: string;
    lastname: string;
    email: string;
    age: number;
    isAdmin: boolean;
    password : string;

    constructor(name: string, lastname: string,email: string,age:number,isAdmin:boolean, password:string){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.isAdmin = isAdmin;
        this.password = password;
        
    }
}