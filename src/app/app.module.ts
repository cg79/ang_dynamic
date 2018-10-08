import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


import { AppComponent } from './app.component';
import {DynamicContentComponent} from './dynamic/dynamic-content.component';
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
import {HttpWrapperService} from "./services/http/httpService";
import {Http, ConnectionBackend, RequestOptions} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./pages/components/header.component";
import {SocketService} from "./services/socket/socketService";
import {LoginComponent} from "./pages/login/login.component";
import {CustomPageComponent} from "./dynamic/pages/custom-page/custom-page.component";
import {ActionnodeNodeComponent} from "./dynamic/pages/page-designer/actions/actionnode.component";
import {ActionService} from "./services/actions/actionService";
import {DynamicTextLabelComponent} from "./dynamic/components/dInput/dynamic-text-label.component";
import {DynamicAccordionComponent} from "./dynamic/components/mdb/accordion/dynamic-accordion.component";
import {DynamicAutocompleteComponent} from "./dynamic/components/mdb/autocomplete/dynamic-autocomplete.component";
import {DynamicCarouselComponent} from "./dynamic/components/mdb/carousel/dynamic-carousel.component";
import {DynamicChartsComponent} from "./dynamic/components/mdb/charts/dynamic-charts.component";
import {DynamicCollapseComponent} from "./dynamic/components/mdb/collapse/dynamic-collapse.component";
import {DynamicDateComponent} from "./dynamic/components/mdb/date/dynamic-date.component";
import {DynamicMapComponent} from "./dynamic/components/mdb/maps/dynamic-map.component";
import {DynamicModalComponent} from "./dynamic/components/mdb/modal/dynamic-modal.component";
import {DynamicTabsComponent} from "./dynamic/components/mdb/tabs/dynamic-tabs.component";
import {DynamicTimeComponent} from "./dynamic/components/mdb/time/dynamic-time.component";
import {DynamicTooltipComponent} from "./dynamic/components/mdb/tooltip/dynamic-tooltip.component";

const configSocket: SocketIoConfig = { url: 'http://localhost:6002', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DynamicContentComponent,
    DynamicContentComponentDemo,
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
    DynamicRepeaterComponent,
    HeaderComponent,
    LoginComponent,
    CustomPageComponent,
    ActionnodeNodeComponent,
    DynamicTextLabelComponent,
    DynamicAccordionComponent,
    DynamicAutocompleteComponent,
    DynamicCarouselComponent,
    DynamicChartsComponent,
    DynamicCollapseComponent,
    DynamicDateComponent,
    DynamicMapComponent,
    DynamicModalComponent,
    DynamicTabsComponent,
    DynamicTimeComponent,
    DynamicTooltipComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'anguynamic' }),
    FormsModule,
    HttpClientModule,
    ModuleMapLoaderModule,
    WebStorageModule,
    AppRoutingModule,
    SocketIoModule.forRoot(configSocket)
  ],
  providers: [ComponentInjectorService, PubSubService,HttpWrapperService, SocketService, ActionService],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicContentComponent,
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
    DynamicRepeaterComponent,
    DynamicTextLabelComponent,
    DynamicAccordionComponent,
    DynamicAutocompleteComponent,
    DynamicCarouselComponent,
    DynamicChartsComponent,
    DynamicCollapseComponent,
    DynamicDateComponent,
    DynamicMapComponent,
    DynamicModalComponent,
    DynamicTabsComponent,
    DynamicTimeComponent,
    DynamicTooltipComponent
  ]
})
export class AppModule { }
