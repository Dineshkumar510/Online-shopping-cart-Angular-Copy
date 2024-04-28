import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(value: any[], searchTerm:any): any[] {
    if(!value || !searchTerm){
      return value;
    }
    searchTerm = searchTerm.toLowerCase();

    return value.filter((mainValue)=> {
      const title = `${mainValue.title}`.toLowerCase();
      return title.includes(searchTerm);
    })
  }

}
