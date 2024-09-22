import { Pipe, PipeTransform } from '@angular/core';
import { FlagEnum } from '../../models/flag.enum';

@Pipe({
  name: 'flagColor'
})
export class FlagColorPipe implements PipeTransform {
  transform(value: FlagEnum): string {
    switch (value) {
      case FlagEnum.Green:
        return 'Green Flag';
      case FlagEnum.Orange:
        return 'Orange Flag';
      case FlagEnum.Purple:
        return 'Purple Flag';
      case FlagEnum.Red:
        return 'Red Flag';
      default:
        return 'No Flag';
    }
  }
}
