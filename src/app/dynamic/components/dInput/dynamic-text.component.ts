import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicComponent } from '../../dynamic.component';

@Component({
    selector: 'dynamic-text',
  template: `
  <input type="text" class="form-control" id="{{context.id}}" name="{{context.name}}" [(ngModel)]="context.value"  (input)="change($event)">
  <ng-template #errcontainer></ng-template>
  <!--<pre> {{context | json}} </pre>-->
    `
})

export class DynamicTextComponent extends DynamicComponent {
  @ViewChild('errcontainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super();
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
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
