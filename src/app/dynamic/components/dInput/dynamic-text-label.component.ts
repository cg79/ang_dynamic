import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicComponent } from '../../dynamic.component';
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamicTextLabel]',
  template: `
      <div class="input-field col s6">
      <input type="{{context.compType || 'text'}}" class="{{context.class}}" id="{{context.id}}" name="{{context.name || context.id}}" [(ngModel)]="context.value"  (input)="change($event)">
      <label for="{{context.id}}"> {{context.labelText}}</label>
      <ng-template #errcontainer></ng-template>
      </div>
  
 
  
  <!--<pre> {{context | json}} </pre>-->
    `
})

export class DynamicTextLabelComponent extends DynamicComponent {
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
