import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../../dynamic.component";
import {PubSubService} from "../../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamicTooltip]',
  template: `
{{template}}
    <!--<ng-container *ngIf="template == 'default'">-->
     <label  id="{{context?.id}}" class="{{context?.class}}">
      <span>{{context?.value}}</span>
      <ng-template #dynamic1></ng-template>
    </label>
  <!--</ng-container>-->

    <!--<ng-container *ngIf="template == 'data'">-->
        <!--<label  id="{{context?.id}}" class="{{context?.class}}">-->
          <!--<span>{{data[context.value]}}</span>-->
          <!--<ng-template #dynamic1></ng-template>-->
        <!--</label>-->
    <!--</ng-container>-->
    
    
  `
})
export class DynamicTooltipComponent extends DynamicComponent {
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
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

}
