import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-chk-lbl-left]',
  template: `
    <p>
        <input type="checkbox" id="{{context.id}}"  [(ngModel)]="context.value"/>
        <label for="{{context.id}}">{{context.text}}</label>
        
    </p>
    <pre> {{context | json}} </pre>
   `
})
export class DynamicChkLabelLeftComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(pubSubService);
    // this.service = service;
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.afterInit();
  }

}
