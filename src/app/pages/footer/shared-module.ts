import {NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  {FooterComponent} from './footer.component';
import { EscapeHtmlPipe } from '../../pipes/keep-html.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    FooterComponent,
    EscapeHtmlPipe
  ],
  exports: [
    FooterComponent,
    EscapeHtmlPipe
  ]
})
export class SharedModule {

}
