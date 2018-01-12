import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DraggableDirective } from './draggable/draggable.directive';

import { AppComponent } from './app.component';
import { DcfComponent } from './dcf/dcf.component';
import { DynamicDivComponent } from './dynamic_div/dynamic_div.component';


@NgModule({
  entryComponents: [ DynamicDivComponent ],
  declarations: [
    AppComponent,
    DcfComponent,
    DynamicDivComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
