import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingspageComponent } from './Components/bookingspage/bookingspage.component';
import { SearchpageComponent } from './Components/searchpage/searchpage.component';

const routes: Routes = [
  {path: 'search',component: SearchpageComponent},
  {path: 'bookings',component:BookingspageComponent},
  {path: '',redirectTo: 'search',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
