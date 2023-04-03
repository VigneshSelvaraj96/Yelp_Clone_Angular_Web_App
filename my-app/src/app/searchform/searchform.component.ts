import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Input, Output, EventEmitter } from '@angular/core';

import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter, skip } from 'rxjs/operators';
import { outputAst } from '@angular/compiler';


@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  ipinfoapiurl: string = 'https://ipinfo.io/?token=340e355e87a33d';
  geocodingapi: string = 'AIzaSyAFc1nfVRj69PHJgilPz2LNWBybwBCX9jQ';
  backendurl: string = 'https://yelpcloneangular.wl.r.appspot.com';
  searchkeywordCtrl = new FormControl();
  filteredkeyword: any;
  keyword: string = '';
  distance: number = 10;
  distancemeters: number = 10*1609.34;
  category: string = 'all';
  location: string = '';
  lat: number = 0;
  long: number = 0;
  autodetect: boolean = false;
  minLengthTerm = 2;
  isLoading = false;
  busresults: any;

  @Output() newresults = new EventEmitter<any>();
  @Output() clearsignal = new EventEmitter<any>();
  @Output() submitsignal = new EventEmitter<any>();

  addresults(value:any){
    this.newresults.emit(value);
  }
  sendclearsignal(bool:boolean){
    this.clearsignal.emit(bool);
  }

  sendsubmitsignal(bool:boolean){
    this.submitsignal.emit(bool);
  }

  constructor(private http: HttpClient) { 
    
   }

  onSelected() {
    this.keyword = this.keyword;
  }

  displayWith(value: any) {
    return value?.Title;
  }

  clearSelection() {
    this.keyword = "";
    this.filteredkeyword = [];
  }


  ngOnInit(): void {
    this.searchkeywordCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => {
          this.filteredkeyword = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(this.backendurl+'/autocomplete?key=' + value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
      .subscribe((data: any) => {
      //  console.log(data);
        if (data == undefined || data == null) {
          this.filteredkeyword = [];
        } else {
          for(let i=0;i<data.categories.length;i++){
            this.filteredkeyword.push(data.categories[i].title);
          }
          for (let i = 0;i<data.terms.length;i++) {
            this.filteredkeyword.push(data.terms[i].text);
          }
        }
       // console.log(this.filteredkeyword);
      });
  }
  


  onreset(): void {
    this.autodetect=false;
    this.sendclearsignal(true);
  }

  async onsubmitpressed(): Promise<void> {
    if (this.autodetect) {
      var res = await fetch(this.ipinfoapiurl,{method:'get'})
      var obj = await res.json();
      this.lat = obj.loc.split(',')[0];
      this.long = obj.loc.split(',')[1];
    }
    else{
      var address = this.location;
      const akey = encodeURIComponent(address);
      var urlapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${akey}&key=${this.geocodingapi}`;
      var res = await fetch(urlapi,{method:'get'})
      var obj = await res.json()
      console.log(obj);
      this.lat = obj.results[0].geometry.location.lat;
      this.long = obj.results[0].geometry.location.lng;
    }
   // console.log(this.lat);
   // console.log(this.long);
    this.distancemeters = Math.round(this.distance*1609.34);
    var url = `${this.backendurl}/searchall?term=${this.keyword}&latitude=${this.lat}&longitude=${this.long}&categories=${this.category}&radius=${this.distancemeters}`;
    var data = await fetch(url,{method:'get'});
    var jsondata = await data.json();
    this.busresults = jsondata;
    this.addresults(this.busresults);
    this.sendsubmitsignal(true);
    //console.log(jsondata);
  }


}
