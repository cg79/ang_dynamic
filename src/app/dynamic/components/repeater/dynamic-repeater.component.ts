import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-repeater',
  template: `
      <ng-template #dynamic1></ng-template>
      <!--<div *ngFor="let item of context.items">-->
         <!--<dynamic-content [context]="context.rowTemplate" [data]="item"></dynamic-content>-->
      <!--</div>-->
`
})

export class DynamicRepeaterComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super();
    // this.service = service;
  }

  onSelect(data)
  {

  }
  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    const { childrens } = this.context.rowTemplate;
    if(!childrens)
    {
      return;
    }

    for(var j=0; j < this.context.items.length; j++) {
      const data = this.context.items[j];
      for(var i=0;i<childrens.length;i++) {
        const children = childrens[i];
        this.addChild2(this.viewContainerRef,this.componentFactoryResolver,children, data);
      }
    }

    // for(var i=0;i<childrens.length;i++) {
    //   const children = childrens[i];
    //   for(var j=0; j < this.context.items.length; j++) {
    //     const data = this.context.items[j];
    //     this.addChild2(this.viewContainerRef,this.componentFactoryResolver,children, data);
    //   }
    // }
    // this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

}
