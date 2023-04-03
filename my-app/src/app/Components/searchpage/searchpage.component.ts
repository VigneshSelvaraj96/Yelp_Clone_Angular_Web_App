import { Component, Input, OnInit, Output } from '@angular/core';
import { SearchformComponent } from 'src/app/searchform/searchform.component';
import { ResultstableComponent } from 'src/app/resultstable/resultstable.component';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  backendurl: string = 'https://yelpcloneangular.wl.r.appspot.com';

  resultsfromparent : any;
  clearsignal: boolean = false;
  submitsignal: boolean = false;
  showcard: boolean = false;
  businessid: string = '';
  buslat: number = 0;
  buslong: number = 0;
  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom : 14
 }

  fowwardevent($event:any)
  {
    this.resultsfromparent = $event;
  }

  forwardsignal($event:boolean){
    this.clearsignal = $event;
    this.showcard = false;
  }

  setsubmitsignal($event:boolean){
    this.submitsignal = $event;
    this.clearsignal = false;
  }

   async showcardevent($event:string){
    this.businessid = $event;
    var queryurl=this.backendurl+'/searchbusiness?id='+this.businessid;
    var data = await fetch(queryurl,{method:'get'});
    var jsondata = await data.json();
    this.buslat = jsondata.coordinates.latitude;
    this.buslong = jsondata.coordinates.longitude;
    this.mapOptions = {
      center: { lat: this.buslat, lng: this.buslong},
      zoom : 14
   }
   console.log(this.mapOptions);
    this.showcard = true;
    this.clearsignal = true;
  }

  hidecard($event:boolean){
    this.showcard = $event;
    this.clearsignal = $event;
  }

  constructor() { }
  ngOnInit(): void {
  }

}
