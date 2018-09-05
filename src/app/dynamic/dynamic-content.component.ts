import {
    Component, Input, OnInit, OnDestroy,
    ViewChild, ViewContainerRef,
    ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import {DynamicSample1Component} from "./components/dynamic-sample1.component";
import {DynamicComponent} from "./dynamic.component";
import {DynamicLabelComponent} from "./components/dLabel/dynamic-label.component";
import {DynamicDivComponent} from "./components/dDiv/dynamic-div.component";
import { DynamicTextComponent } from './components/dInput/dynamic-text.component';

@Component({
    selector: 'dynamic-content',
    template: `
            <div #container></div>
    `
})
export class DynamicContentComponent implements OnInit, OnDestroy {

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @Input() context: any;

    private mappings = {
        'sample1': DynamicSample1Component,
        'label': DynamicLabelComponent,
      'div': DynamicDivComponent,
      'text': DynamicTextComponent
    };

    private componentRef: ComponentRef<{}>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
                    private viewContainerRef: ViewContainerRef) {
    }

    getComponentType(typeName: string) {
        let type = this.mappings[typeName];
        return type;// || UnknownDynamicComponent;
    }

    ngOnInit() {
        if (this.context.type) {
            let componentType = this.getComponentType(this.context.type);

            // note: componentType must be declared within module.entryComponents
            let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
            this.componentRef = this.container.createComponent(factory);

            // set component context
            let instance = <DynamicComponent> this.componentRef.instance;
            instance.context = this.context;


          // const factory = this.componentFactoryResolver.resolveComponentFactory(DynamicLabelComponent);
          //   const ref = this.viewContainerRef.createComponent(factory);
          //   ref.changeDetectorRef.detectChanges();

        }
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

}
