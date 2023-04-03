import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resultstable',
  templateUrl: './resultstable.component.html',
  styleUrls: ['./resultstable.component.css']
})
export class ResultstableComponent implements OnInit {

  @Input()
  resultsfromparent:any;


  noresults=false;


  apicallmade = false;

  @Output()
  showcardevent = new EventEmitter<string>();


  jsondatareturned(){
    if((this.resultsfromparent == undefined))
    {
      this.apicallmade = false;
    }
    else {
      this.apicallmade=true;
      if(this.resultsfromparent.businesses.length == 0) this.noresults = true; 
      else{
        this.noresults = false;
      this.resultsfromparent.businesses = this.resultsfromparent.businesses.slice(0, 10);
      }
  }
}
  candisplaytable(){
   this.jsondatareturned();
   return this.apicallmade && !this.noresults
  }

  candisplaynoresults(){
    this.jsondatareturned();
    return this.apicallmade && this.noresults
  }

  calculatemiles(meters: number){
    return meters*0.000621371;
  }
  constructor() { }

  ngOnInit(): void {
  }

  showcard(id: string){
    this.showcardevent.emit(id);
  }

  }


