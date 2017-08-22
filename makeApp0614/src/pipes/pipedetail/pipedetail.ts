import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipedetailPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'pipedetail',
})
export class PipedetailPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any,content:any) {
    //return value.toLowerCase();
    var arr=[];
      for (let key in value) {
        let field = value[key];
        //if (typeof field == 'string' && field.indexOf(content) >= 0) {
        //  return value;
        //} else if (field == params[key]) {
        //  return value;
        //}
        if (field.chapterno == content) {
         arr.push(field)
        }
      }

    return arr;
  }
}
