import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


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
import {PubSubService} from './services/pubSub/pubsub';
import {DynamicErrorComponent} from './dynamic/components/dLabel/dynamic-error.component';
import { PageCheckboxComponent } from './dynamic/pages/page-checkbox/page-checkbox.component';
import { PageContainerComponent } from './dynamic/pages/page-container/page-container.component';
import { PageTextComponent } from './dynamic/pages/page-text/page-text.component';
import { ListRadioComponent } from './dynamic/pages/list-radio/list-radio.component';
import { ListCheckboxComponent } from './dynamic/pages/list-checkbox/list-checkbox.component';
import {PageLabelComponent} from './dynamic/pages/page-label/page-label.component';
import {PageDesignerComponent} from './dynamic/pages/page-designer/page-designer.component';
import {HtmlNodeComponent} from "./dynamic/pages/page-designer/customTree/htmlnode.component";
import {ObjectKeysPipe} from "./pipes/objectKeys.pipe";
import {EscapeHtmlPipe} from "./pipes/keep-html.pipe";
import {TreeDesignerComponent} from "./dynamic/pages/page-designer/designerComponent/tree-designer.component";
import {DynamicParagrafComponent} from "./dynamic/components/dLabel/dynamic-paragraf.component";
import {PropDesignerComponent} from "./dynamic/pages/page-designer/customTree/prop/prop-designer.component";
import {WebStorageModule} from "ngx-store";
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/notfound.component";
import {AppRoutingModule} from "./routes/app-routing.module";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {DynamicDropDownComponent} from "./dynamic/components/dropdown/dynamic-dropdown.component";
import {DynamicLinkComponent} from "./dynamic/components/dLabel/dynamic-link.component";
import {DynamicButtonComponent} from "./dynamic/components/dLabel/dynamic-button.component";
import {DynamicFileUploadComponent} from "./dynamic/components/dLabel/dynamic-file-upload.component";
import {DynamicDropDownTemplateComponent} from "./dynamic/components/dropdown/dynamic-dropdown-template.component";
import {DynamicRepeaterComponent} from "./dynamic/components/repeater/dynamic-repeater.component";

const configSocket: SocketIoConfig = { url: 'http://localhost:6002', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
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
    DynamicContainerComponent,
    DynamicErrorComponent,
    PageLabelComponent,
    PageCheckboxComponent,
    PageContainerComponent,
    PageTextComponent,
    ListRadioComponent,
    ListCheckboxComponent,
    PageDesignerComponent,
    TreeDesignerComponent,
    HtmlNodeComponent,
    ObjectKeysPipe,
    EscapeHtmlPipe,
    DynamicParagrafComponent,
    PropDesignerComponent,
    DynamicDropDownComponent,
    DynamicLinkComponent,
    DynamicButtonComponent,
    DynamicFileUploadComponent,
    DynamicDropDownTemplateComponent,
    DynamicRepeaterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'anguynamic' }),
    FormsModule,
    ModuleMapLoaderModule,
    WebStorageModule,
    AppRoutingModule,
    SocketIoModule.forRoot(configSocket)
  ],
  providers: [ComponentInjectorService, PubSubService],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicContentComponent,
    DynamicSample1Component,
    DynamicLabelComponent,
    DynamicDivComponent,
    DynamicTextComponent,
    DynamicChkLabelLeftComponent,
    DynamicChkLabelRightComponent,
    DynamicChkLabelLeftListComponent,
    DynamicRadioLabelLeftListComponent,
    DynamicContainerComponent,
    DynamicErrorComponent,
    DynamicParagrafComponent,
    DynamicDropDownComponent,
    DynamicLinkComponent,
    DynamicButtonComponent,
    DynamicFileUploadComponent,
    DynamicDropDownTemplateComponent,
    DynamicRepeaterComponent
  ]
})
export class AppModule { }
