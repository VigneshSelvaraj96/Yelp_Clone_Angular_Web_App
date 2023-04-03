import { A11yModule } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationserviceService {

  
  reservation: reservation[]=[];
  private reservationslist: BehaviorSubject<any> = new BehaviorSubject([]);
  private reservationslist$ = this.reservationslist.asObservable();

  getreservationslist(){
    return this.reservationslist$;
  }

  setreservationlist(reservationlist:reservation[]){
    localStorage.setItem('reservationslist',JSON.stringify(reservationlist) as string);
    this.reservationslist.next(JSON.parse(localStorage.getItem('reservationslist')as string));
  }

  constructor() {
    if(window.localStorage.getItem('reservationslist') as string==null){
      this.reservation=[];
      this.reservationslist.next(this.reservation);
    }
    else{
      this.reservation=JSON.parse(window.localStorage.getItem('reservationslist') as string);
      this.reservationslist.next(this.reservation);
    }
   }
}
