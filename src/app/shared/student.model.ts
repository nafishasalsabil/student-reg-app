export type Student={
      firstName:string;
      lastName:string;
      email:string;
      dob:string;
      board:string;
      contact:string;
      address:string;
      password:string;
      ssc:[
        {
            subject:string;
            gpa:string;
        }
      ];
      hsc:[
        {
            subject:string;
            gpa:string;
        }
      ]
      
    }