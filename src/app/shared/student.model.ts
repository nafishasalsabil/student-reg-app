    import { Degree } from "./degree.model";

    export class Student{
        
        constructor(
            public firstname:string, 
            public lastname:string, 
            public email:string, 
            public dob:string,
            public board:string,
            public contact: string,
            public address:string,
            public ssc:Degree[],
            public hsc:Degree[]){

            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.dob = dob;
            this.board=board;
            this.contact = contact;
            this.address = address;
            this.ssc=ssc;
            this.hsc=hsc;
        
            
        }
    }