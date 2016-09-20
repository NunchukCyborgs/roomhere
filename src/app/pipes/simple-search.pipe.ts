import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'simpleSearch' })
export class SimpleSearchPipe implements PipeTransform {
  transform<T>(value: T[], query: string, property?: string): T[] {
    if (!value || !value.length || !query) {
      return value;
    }

    const computed = typeof value[0] === 'object' && property ? value.map(i => i[property]) : value;
    const combined = value.map((original, index) => ({ original: original, computed: computed[index] }));
    const results = combined.filter(i => i.computed.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return results.map(i => i.original);
  }
}
