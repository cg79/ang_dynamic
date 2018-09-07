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
import { DynamicTextComponent } from './dynamic/components/dInput/dynamic-text.component';
import {DynamicChkLabelLeftComponent} from "./dynamic/components/input/dynamic-checkbox-label-left.component";
import {DynamicChkLabelRightComponent} from "./dynamic/components/input/dynamic-checkbox-label-right.component";
import {DynamicChkLabelLeftListComponent} from "./dynamic/components/input/dynamic-checkbox-label-left-list.component";
import {DynamicRadioLabelLeftListComponent} from "./dynamic/components/input/dynamic-radio-label-left-list.component";
import {DynamicContainerComponent} from "./dynamic/components/dContainer/dynamic-container.component";
import {PubSubService} from "./services/pubSub/pubsub";

@NgModule({
  declarations: [
    AppComponent,
    DynamicContentComponent,
    DynamicContentComponentDemo,
    DynamicSample1Component,
    DynamicLabelComponent,
    DynamicDivComponent,
    RuntimeContentComponent,
    RuntimeContentComponentDemo,
    DynamicTextComponent,
    DynamicChkLabelLeftComponent,
    DynamicChkLabelRightComponent,
    DynamicChkLabelLeftListComponent,
    DynamicRadioLabelLeftListComponent,
    DynamicContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ComponentInjectorService, PubSubService],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicSample1Component,
    DynamicLabelComponent,
    DynamicDivComponent,
    DynamicTextComponent,
    DynamicChkLabelLeftComponent,
    DynamicChkLabelRightComponent,
    DynamicChkLabelLeftListComponent,
    DynamicRadioLabelLeftListComponent,
    DynamicContainerComponent
  ]
})
export class AppModule { }
