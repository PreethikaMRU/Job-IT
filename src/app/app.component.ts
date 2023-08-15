import { Component, ElementRef, ViewChild } from '@angular/core';
import { JobsService } from './services/jobs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-finder';
  result:any[]=[];
  result1:any[]=[];
  skill:string[];
  place:string[];
  switch:boolean=true;
  switch2:boolean=false;

  @ViewChild("e1") errorKeyword! : ElementRef<HTMLHeadingElement>; 
  @ViewChild("e2") errorLocation!:ElementRef<HTMLHeadingElement>;
  @ViewChild("Topbttn") topButton!:ElementRef<HTMLButtonElement>;

  constructor(private jobsApi: JobsService){
    this.skill=jobsApi.skills;
    this.place=jobsApi.locations;
    window.addEventListener('scroll',()=>{
      if(window.scrollY<600){
        this.topButton.nativeElement.style.display="none";
      }
      else{
        this.topButton.nativeElement.style.display="block";
      }
    })
  }


  handleTopButton(){
    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    })
  }
  
  handleMouseOn(ele:any) {
    ele.style.backgroundColor= "#4E4FEB";
  }

  handleMouseOff(ele:any){
    ele.style.backgroundColor = "white";
  }

  handleBlur(ele:number,value:string){
    if(ele==1){
      if(value==""){this.errorKeyword.nativeElement.style.visibility="visible";}
      else{this.errorKeyword.nativeElement.style.visibility="hidden";}
    }
    else if(ele==2){
      if(value==""){this.errorLocation.nativeElement.style.visibility="visible";}
      else{this.errorLocation.nativeElement.style.visibility="hidden";}
    }
    
  }

  handleClick(s:string,l:string){
    if(s=="" && l==""){
      this.errorKeyword.nativeElement.style.visibility = "visible";
      this.errorLocation.nativeElement.style.visibility = "visible";
      this.result=[];
      this.result1=[];
      this.switch=true;
    }
    else if(s==""){
      this.errorKeyword.nativeElement.style.visibility = "visible";
      this.errorLocation.nativeElement.style.visibility = "hidden";
      this.result=[];
      this.result1=[];
      this.switch=true;
    }
    else if(l==""){
      this.errorLocation.nativeElement.style.visibility = "visible";
      this.errorKeyword.nativeElement.style.visibility = "hidden";
      this.result=[];
      this.result1=[];
      this.switch=true;
    }
    else{
      this.errorLocation.nativeElement.style.visibility = "hidden";
      this.errorKeyword.nativeElement.style.visibility = "hidden";
      try{
        let temps = this.skill.filter((ele) => ele.toLowerCase().includes(s.toLowerCase()));
        let templ = this.place.filter((ele) => ele.toLowerCase().includes(l.toLowerCase()));
        let tempResult1:[]=[];
        let tempResult2:[]=[];
        this.jobsApi.callApi(temps,templ,2).subscribe((data) => {
          tempResult1=data.results;
        });
        this.jobsApi.callApi(temps,templ,1).subscribe((data) => {
          tempResult2=data.results;
          this.result=tempResult1.concat(tempResult2);
          this.result1=this.result;
          this.switch=false;
          if(this.result.length==0){
            this.switch2=true;
          }
          else{
            this.switch2=false;
          }
        });
      }
      catch(err){
        console.log(err);
      }
      finally{
        window.scrollTo({
          top: 1000,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }

  handleChange(ele:any){
    if(ele.value=="Show all"){
      this.result = this.result1;
    }
    else{
      this.result = this.result1.filter((e) => {if(e.levels[0].name.toLowerCase().includes(ele.value.toLowerCase())==true){
        return e;
      }});
    }
  }

  handleSort(ele:string){
    switch (ele) {
      case "sorta-z":
        this.result.sort(function(a,b){
          return (a.name<b.name)?-1:(a.name>b.name)?1:0;
        });
        break;
      case "sortz-a":
        this.result.sort(function(a,b){
          return (a.name>b.name)?-1:(a.name<b.name)?1:0;
        })
        break;
      case "newest":
          this.result.sort(function(a,b){
            return (a.publication_date>b.publication_date)?-1:(a.publication_date<b.publication_date)?1:0;
          })
        break;
      case "oldest":
          this.result.sort(function(a,b){
            return (a.publication_date<b.publication_date)?-1:(a.publication_date>b.publication_date)?1:0;
          })
        break;
      default:
        break;
    }
  }

}
