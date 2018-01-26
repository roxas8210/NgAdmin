import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'websiteCompleter'
})
export class WebsiteCompleterPipe implements PipeTransform {

  transform(value: string, args?: string): string {
    return args + value;
  }

}
