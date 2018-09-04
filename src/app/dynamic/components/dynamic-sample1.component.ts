import { Component } from '@angular/core';
import {DynamicComponent} from "../dynamic.component";

@Component({
    selector: 'dynamic-sample-1',
    template: `<div>Dynamic sample 1 ({{context?.text}})</div>`
})
export class DynamicSample1Component extends DynamicComponent {}
