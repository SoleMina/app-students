import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMask',
  standalone: false,
})
export class EmailMaskPipe implements PipeTransform {
  transform(value: string): string {
    const [name, domain] = value.split('@');
    if (name.length <= 2) {
      return `${name}@${domain}`;
    }
    return `${name.slice(0, 2)}****@${domain}`;
  }
}
