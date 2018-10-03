import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {HttpWrapperService} from "../../../services/http/httpService";

@Component({
    selector: '[dynamic-error]',
  template: `
    <label class="has-error" id={{context?.id}}>
      {{context.errMessage}}
    </label>`
})
export class DynamicErrorComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private httpWrapperService: HttpWrapperService
    ) {
    super();
    // this.service = service;
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    const { children } = this.context;
    this.http(this.httpWrapperService);

    if (children) {
      this.addChild1(this.viewContainerRef, this.componentFactoryResolver, children);

    }
  }

}
