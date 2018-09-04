import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DynamicContentComponent} from './dynamic/dynamic-content.component';
import {DynamicSample1Component} from './dynamic/components/dynamic-sample1.component';
import {RuntimeContentComponent} from './dynamic/runtime-content.component';
import {DynamicContentComponentDemo} from './dynamic/components/dynamic-content.component.demo';
import {FormsModule} from '@angular/forms';
import {RuntimeContentComponentDemo} from './dynamic/components/runtime-content.component.demo';
import {DynamicLabelComponent} from './dynamic/components/dLabel/dynamic-label.component';
import {DynamicDivComponent} from './dynamic/components/dDiv/dynamic-div.component';
import { ComponentInjectorService } from './dynamic/component-injector.service';

@NgModule({
  declarations: [
    AppComponent,
    DynamicContentComponent,
    DynamicContentComponentDemo,
    DynamicSample1Component,
    DynamicLabelComponent,
    DynamicDivComponent,
    RuntimeContentComponent,
    RuntimeContentComponentDemo
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ComponentInjectorService],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicSample1Component,
    DynamicLabelComponent,
    DynamicDivComponent,
  ]
})
export class AppModule { }
