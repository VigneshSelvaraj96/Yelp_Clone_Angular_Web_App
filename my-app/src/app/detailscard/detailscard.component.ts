import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReservationserviceService } from '../reservationservice.service';
import { Subscription } from 'rxjs';
import { reservation } from '../reservation';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  NgForm
} from '@angular/forms';
import { json } from 'express';


const googleapikey = 'AIzaSyAFc1nfVRj69PHJgilPz2LNWBybwBCX9jQ';

@Component({
  selector: 'app-detailscard',
  templateUrl: './detailscard.component.html',
  styleUrls: ['./detailscard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailscardComponent implements OnInit {

  @Input()
  businessid = '';

  @Input()
  buslat:number =0;
  
  @Input()
  buslong:number=0;

  @Input()
  mapOptions: google.maps.MapOptions={center: { lat: 0, lng: 0 },
  zoom : 14}

  marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
 }

  backendurl: string = 'https://yelpcloneangular.wl.r.appspot.com';

  //business information
  categories: string = 'N/A';
  phone='N/A';
  isopennow: string = 'N/A';
  address='N/A';
  name='N/A';
  urlofphotos=[];
  price='N/A';
  businessurl='';
  reviews:any;
  reservationlist: reservation[] = [];
  subscription!: Subscription;
  loaded:boolean = false;
  businessisreserved:boolean = false;


  myform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    date: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
    min: new FormControl('', Validators.required),});


    get date() { return this.myform.get('date'); }

  @Output()
  hidecardsignal = new EventEmitter<any>(); 
  
  hidecardevent(){
    this.hidecardsignal.emit(false);
  }

  classtoapply()
  {
    if(this.isopennow=='Open now') return 'greenclass';
    else return 'redclass';
  }  

  /*mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom : 14
 }
 marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
 }
 */

 checkifreserved(){
  if(this.reservationlist==null) return false;
  for(var i=0;i<this.reservationlist.length;i++){
    if(this.reservationlist[i].name==this.name){
      return true;
    }
  }
  return false;
 }

  resetform(){
    this.myform.reset();
  }

  onSubmit(){
    // form validation
    if(this.myform.valid){
    alert("Reservation created!");
    this.businessisreserved=true;
    //console.log(this.myform.value);
    //add reservation
    var thisreservation:reservation = {
      name: this.name,
      email: this.myform.value.email,
      date: this.myform.value.date,
      time: this.myform.value.hour+':'+this.myform.value.min,
    }
    this.reservationlist.push(thisreservation);
    this.reservationservice.setreservationlist(this.reservationlist);
    this.myform.reset();
    document.getElementById('closebutton')?.click();
    }
  }

  cancelreservation(){
    for(var i=0;i<this.reservationlist.length;i++){
      if(this.reservationlist[i].name==this.name){
        this.reservationlist.splice(i,1);
      }
    }
    this.reservationservice.setreservationlist(this.reservationlist);
    this.businessisreserved=false;
    alert("Reservation cancelled!");
  }

  gettodaydate(){
    var today = new Date().toISOString().split('T')[0];
    return today;
  }




    constructor(private reservationservice: ReservationserviceService) { 

    }



      

  ngOnInit(): void {
    this.querybusiness(this.businessid);
    this.loaded = true;
    (function () {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event:any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()

    // subscribe to the reservationlist
    this.subscription = this.reservationservice.getreservationslist().subscribe(reservationlist => {
      this.reservationlist = reservationlist;
      this.businessisreserved = this.checkifreserved();
    });
  }



  async querybusiness(businessid:string) {
    var queryurl=this.backendurl+'/searchbusiness?id='+businessid;
    var data = await fetch(queryurl,{method:'get'});
    var jsondata = await data.json();
    var cat = jsondata.categories;
    this.buslat = jsondata.coordinates.latitude;
    this.buslong = jsondata.coordinates.longitude;
    if(cat.length>0){
      this.categories = '';
      for (var i=0; i<cat.length; i++){
        this.categories = this.categories+cat[i].title+' | ';
      }
      this.categories = this.categories.slice(0, -2);

    }
    if (jsondata.display_phone!='') {
      this.phone = jsondata.display_phone;
    }
    if(!jsondata.hours[0].is_open_now) this.isopennow = 'Closed';
    else this.isopennow = 'Open now';
    this.address = jsondata.location.address1 + ', ' + jsondata.location.city + ', ' + jsondata.location.state + ' ' + jsondata.location.zip_code;
    this.name = jsondata.name;
    this.urlofphotos = jsondata.photos;
    if (jsondata.price!='' && jsondata.price!=undefined) {
	  this.price = jsondata.price;
    }
    this.businessurl = jsondata.url;
    var queryurl=this.backendurl+'/reviews?id='+businessid;
    var data = await fetch(queryurl,{method:'get'});
    var jsondata = await data.json();
    this.reviews = jsondata.reviews;
    this.reviews= this.reviews.slice(0,3);
    this.mapOptions={center: { lat: this.buslat, lng: this.buslong },
      zoom : 14}
    this.marker = { position: { lat: this.buslat, lng: this.buslong },}

  }

  getErrorMessage(control: AbstractControl): string {
    // Don't say anything if control doesn't exist, or is valid
    if (!control || control.valid) {
      return '';
    }

    // Required always comes first
    if (control.hasError('required')) {
      return "Cannot be empty";
    }
    if (control.hasError('email')) {
      return "Must be a valid email";
    }

    return "Invalid input";
  }

  get feedbackField(): AbstractControl {
    return this.myform.get('email')!;
  }
  
  

}
