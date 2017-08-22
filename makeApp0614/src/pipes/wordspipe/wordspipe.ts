import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Pipe1Pipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'wordspipe',
})
export class WordsPipe implements PipeTransform {
  transform (value: any, wordwise: any, max: any, tail: any) {
  if (!value) return '';

  max = parseInt(max, 10);
  if (!max) return value;
  if (value.length <= max) return value;

  value = value.substr(0, max);
  if (wordwise) {
    var lastspace = value.lastIndexOf(' ');
    if (lastspace != -1) {
      value = value.substr(0, lastspace);
    }
  }

  return value + (tail || ' …');
};
}
