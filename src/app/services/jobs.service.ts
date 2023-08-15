import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import {key} from "../../key"
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  key = process.env.NG_APP_KEY;
  constructor(private http:HttpClient) { 
    console.log(this.key);
  }
  skills:string[] = ["Administration and Office", "Business Operations", "Computer and IT", "Data and Analytics", "Human Resources and Recruitment", "Office Administration", "Product Management", "Science and Engineering", "Software Engineering", "Data Science", "Design and UX", "Management", "HR","Recruiting", "Project Management", "UX", "Sales"];
  locations:string[] = ["Bangalore, India","Hyderabad, India","Chennai, India","Mumbai, India","Kolkata, India","Gurgaon, India","Ahmedabad, India","Chandigarh, India","Pune, India","Lucknow, India","Madurai, India","Kochi, India","Thiruvananthapuram, India","Jaipur, India"];
  

  callApi (skill:any,location:any,page:number) {
    let l=encodeURIComponent(location);
    let s = encodeURIComponent(skill);
    return this.http.get<any>(`https://www.themuse.com/api/public/jobs?api_key=`+this.key+`&category=${s}&location=${l}&page=${page}&descending=true`);
  }
}
