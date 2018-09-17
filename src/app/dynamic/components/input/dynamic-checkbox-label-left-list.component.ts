import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";

@Component({
    selector: 'dynamic-chk-lbl-left-list',
  template: `
      <span>{{context?.text}}</span>
      <div *ngFor="let option of context.items; index as i;">
        <input type="checkbox"
          id="{{context.name}}{{i}}"
          [value]=option[context.bindValue]
          [(ngModel)]="option[context.checkedProperty]"
        />
        <label for="{{context.name}}{{i}}">{{option[context.bindText]}}</label>
      </div>
`
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
    this.afterInit();
  }

}
