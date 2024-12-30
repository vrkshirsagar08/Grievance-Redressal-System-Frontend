import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs, {EmailJSResponseStatus } from '@emailjs/browser'; 
import { response } from 'express';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';


interface ContactForm{
  name:string;
  email:string;
  addhar:any;
  phone:any;
  subject:any;
  query:any;
}
@Component({
  standalone:true,
  selector: 'app-contactus',
  imports: [FormsModule,HttpClientModule,SharedModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ContactusComponent {
  form:ContactForm ={   
    name:'',
    email:'',
    addhar:'',
    phone:'',
    subject:'',
    query:''
  };
  
   http=inject(HttpClient)
    send(){
  
      console.log(this.form);
      // this.http.post('https://api.emailjs.com/api/v1.0/email/send',{
      //   lib_version:"4.4.1",service_id:'service_724wzv7', template_id:'template_nlwc6ay',template_params:'this.form',user_id:'s5-WDs-fb8SgwI_nh'
      // },{
      //   responseType:'text',
      // }).subscribe(()=>{
      //   console.log("Success");
      //   alert("Successfully send");
      // });
      emailjs
      .send('service_724wzv7', 'template_nlwc6ay',
          {...this.form},{publicKey:'s5-WDs-fb8SgwI_nh'})
        .then(  
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert("success")
        },
        (error) => {
          console.log('FAILED...', error);
          alert("failed")
        },
    );
   }
}
