import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {HttpWrapperService} from "../../../services/http/httpService";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-dropdown]',
  template: `
    <select class="browser-default"
    (change)="onChange($event.target.value)" 
    [(ngModel)]="context.value">
      <option *ngFor="let item of context.items"
        [value]=item[context.bindValue]>
         {{item[context.bindText]}}
      </option>
    </select>
`
})

export class DynamicDropDownComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private httpWrapperService: HttpWrapperService
    ) {
    super(pubSubService);
    // this.service = service;
  }

  onChange(data)
  {
  }
  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.http(this.httpWrapperService);

    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);

  }

}
