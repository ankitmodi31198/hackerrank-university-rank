import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {UniversitiesByRankComponent} from './universities-by-rank/universities-by-rank.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UniversitiesByRankComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: UniversitiesByRankComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
