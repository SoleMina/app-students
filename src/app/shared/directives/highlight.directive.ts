import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false,
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight = 'yellow';

  @Output() colorUpdated = new EventEmitter();

  constructor(private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlight']) {
      this.elementRef.nativeElement.style.backgroundColor =
        this.appHighlight || 'yellow';
      this.elementRef.nativeElement.style.fontWeight = 'bolder';
    }
  }
}
