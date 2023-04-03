import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchpageComponent } from './Components/searchpage/searchpage.component';
import { BookingspageComponent } from './Components/bookingspage/bookingspage.component';
import { SearchformComponent } from './searchform/searchform.component';
import { ResultstableComponent } from './resultstable/resultstable.component';
import { DetailscardComponent } from './detailscard/detailscard.component';
import { ReservationformComponent } from './reservationform/reservationform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs'; 
import {MatCardModule} from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps'



// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    SearchpageComponent,
    BookingspageComponent,
    SearchformComponent,
    ResultstableComponent,
    DetailscardComponent,
    ReservationformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatCardModule,
    MatTabsModule,
    GoogleMapsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
