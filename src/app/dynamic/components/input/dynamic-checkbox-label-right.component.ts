import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-chk-lbl-right]',
  template: `
    <label  id={{context?.id}}>
      <input type="checkbox" [checked]="context.val"/>
      <span>{{context?.text}}</span>
    </label>`
})
export class DynamicChkLabelRightComponent extends DynamicComponent {
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
