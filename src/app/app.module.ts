import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
// Módulo que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http';
// Ennvironment
import { environment } from '../environments/environment';
// Modulos de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Conexión con un proyecto de firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    // Modulo de autenticación con firebase
    AngularFireAuthModule,
    // Módulo para trabajar con la base de datos
    AngularFirestoreModule,
    // Módulo para alamcenar archivos en firebase
    AngularFireStorageModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
