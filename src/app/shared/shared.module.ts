import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { EmailMaskPipe } from './pipes/email-mask.pipe';

@NgModule({
  declarations: [HighlightDirective, EmailMaskPipe],
  imports: [CommonModule],
  exports: [HighlightDirective, EmailMaskPipe],
})
export class SharedModule {}
