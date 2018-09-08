import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
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
import {DynamicErrorComponent} from "./dynamic/components/dLabel/dynamic-error.component";
import { PageCheckboxComponent } from './dynamic/pages/page-checkbox/page-checkbox.component';
import { PageContainerComponent } from './dynamic/pages/page-container/page-container.component';
import { PageTextComponent } from './dynamic/pages/page-text/page-text.component';
import { ListRadioComponent } from './dynamic/pages/list-radio/list-radio.component';
import { ListCheckboxComponent } from './dynamic/pages/list-checkbox/list-checkbox.component';
import {PageLabelComponent} from "./dynamic/pages/page-label/page-label.component";

@NgModule({

  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [ComponentInjectorService, PubSubService],
  bootstrap: [ AppComponent ],
  entryComponents: [
    DynamicSample1Component,
    DynamicLabelComponent,
    DynamicDivComponent,
    DynamicTextComponent,
    DynamicChkLabelLeftComponent,
    DynamicChkLabelRightComponent,
    DynamicChkLabelLeftListComponent,
    DynamicRadioLabelLeftListComponent,
    DynamicContainerComponent,
    DynamicErrorComponent
  ],
})
export class AppServerModule {}