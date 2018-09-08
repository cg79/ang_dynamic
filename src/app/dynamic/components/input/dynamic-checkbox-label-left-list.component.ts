import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";

@Component({
    selector: 'dynamic-chk-lbl-left-list',
  template: `
    <label  id={{context?.id}}>
      <span>{{context?.text}}</span>
      <div *ngFor="let option of context.items; index as i;">
        <label>
            <input type="checkbox"
                   name={{context.name}}
                   value="{{option[context.bindValue]}}"
                   [(ngModel)]="option[context.checked]"/>
            {{option[context.bindText]}}
        </label>
    </div>
    </label>`
})
export class DynamicChkLabelLeftListComponent extends DynamicComponent {
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
    this.afterInit();
  }

}
