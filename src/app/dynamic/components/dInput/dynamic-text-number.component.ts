import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicComponent } from '../../dynamic.component';
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamicTextNumber]',
  template: `
    <ng-container *ngIf="template == 'default'">
      <input myNumberOnly 
      type="text"
      class="{{context.class}}" 
      id="{{context.id}}" 
      name="{{context.name || context.id}}" 
      [(ngModel)]="context.value"  
      (input)="change($event)">
      <ng-template #errcontainer></ng-template>
    </ng-container>
  
  <ng-container *ngIf="template == 'data'">
      <input type="text" 
        class="{{context.class}}" 
        id="{{context.id}}" 
        name="{{context.name || context.id}}" 
        [(ngModel)]="data[context.value]"  
        (input)="change($event)">
        
      <ng-template #errcontainer></ng-template>
    </ng-container>
  
  <!--<pre> {{context | json}} </pre>-->
    `
})

export class DynamicTextNumberComponent extends DynamicComponent {
  @ViewChild('errcontainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(pubSubService);
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
    this.afterInit();

  }

  errorComponent = null;

  change(data) {
    this.onChange(data);

    if(this.context.hasError) {
      this.errorComponent = this.addChild1(this.viewContainerRef, this.componentFactoryResolver, {
        errMessage: this.context.validation.errMessage,
        id:'asf3',
        type:'error',
      });
    }else{
      if(!this.errorComponent) {
        return;
      }
      this.errorComponent.destroy();

    }
  }

}
