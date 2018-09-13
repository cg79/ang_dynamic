import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";

@Component({
    selector: 'dynamic-chk-lbl-left',
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
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super();
    // this.service = service;
  }

  ngOnInit() {

    if(!this.context )
    {
      return;
    }
    // const { children } = this.context;


    // if (children) {
    //   this.addChild1(this.viewContainerRef, this.componentFactoryResolver, children);

    // }
  }

}
