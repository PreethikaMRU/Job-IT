import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {
  @Input() result : any;
  turn : boolean = false;


  convert(str:string,ele:any){
    ele.innerHTML=str;
  }

  time(time:string){
    let temp=time.replace("Z","");
    return temp.split("T");
  }

  handleClick(ele:any,front:any,back:any,link1:any){
    if(this.turn==false){
      ele.style.transform = "scaleX(-1)";
      front.style.display = "none";
      front.style.visibility = "hidden";
      back.style.display = "flex";
      back.style.visibility = "visible";
      link1.style.transform = "scaleX(-1)";
      this.turn=true;
    }else{
      ele.style.transform = "scaleX(1)";
      back.style.display = "none";
      back.style.visibility = "hidden";
      front.style.display = "flex";
      front.style.visibility = "visible";
      link1.style.transform = "scaleX(1)"
      this.turn=false;
    }
  }
}
