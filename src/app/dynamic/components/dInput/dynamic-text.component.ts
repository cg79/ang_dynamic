import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicComponent } from '../../dynamic.component';

@Component({
    selector: 'dynamic-text',
  template: `
  <input type="text" class="form-control" id="title" required [(ngModel)]="context.title" name="title">
  <pre> {{context | json}} </pre>
    `
})

export class DynamicTextComponent extends DynamicComponent {
  // @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super();
    // this.service = service;
  }

  ngOnInit() {
debugger;
    if(!this.context )
    {
      return;
    }
    const { children } = this.context;


    // if (children) {
    //   this.addChild(this.viewContainerRef, this.componentFactoryResolver, this.context.type, children);

    // }
  }

}
