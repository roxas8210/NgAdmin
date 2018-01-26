import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteCompleterPipe } from './website-completer.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WebsiteCompleterPipe],
  exports: [WebsiteCompleterPipe]
})
export class PipeModule { }
