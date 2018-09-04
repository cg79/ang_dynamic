import { Component } from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-label',
    template: `<label id={{context?.id}}>{{context?.text || 'ggg'}}</label>`
})
export class DynamicLabelComponent extends DynamicComponent {}
