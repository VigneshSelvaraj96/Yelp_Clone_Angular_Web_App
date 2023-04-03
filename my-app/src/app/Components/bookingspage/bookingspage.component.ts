import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { reservation } from 'src/app/reservation';
import { ReservationserviceService } from 'src/app/reservationservice.service';

@Component({
  selector: 'app-bookingspage',
  templateUrl: './bookingspage.component.html',
  styleUrls: ['./bookingspage.component.css']
})
export class BookingspageComponent implements OnInit {


  reservationlist: reservation[] = [];
  subscription!: Subscription;

  deletereservation(name: string){
    
    for(let i = 0; i < this.reservationlist.length; i++){
      if(this.reservationlist[i].name == name){
        this.reservationlist.splice(i, 1);
      }
    }
    this.reservationservice.setreservationlist(this.reservationlist);
    alert("Reservation cancelled!");
  }

  constructor(private reservationservice: ReservationserviceService) { 
  }

  ngOnInit(): void {
    // subscribe to the reservationlist
    this.subscription = this.reservationservice.getreservationslist().subscribe(reservationlist => {
      this.reservationlist = reservationlist;
    });
  }

}
