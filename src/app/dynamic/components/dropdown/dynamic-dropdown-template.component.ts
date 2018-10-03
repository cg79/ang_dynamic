import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: '[dynamic-dropdown-template]',
  template: `
    <select class="browser-default"
    (change)="onSelect($event.target.value)" 
    [(ngModel)]="context.value">
      <option *ngFor="let item of context.items"
        [value]=item[context.bindValue]>
         {{item[context.bindText]}}
         <dynamic-content [context]="context.rowTemplate"></dynamic-content>
      </option>
    </select>
`
})

export class DynamicDropDownTemplateComponent extends DynamicComponent {
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
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

}
