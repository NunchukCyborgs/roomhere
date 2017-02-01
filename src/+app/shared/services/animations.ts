import { animate, trigger, state, style, transition } from '@angular/core';

export const flyInOut = trigger('flyInOut', [
  state('in', style({ transform: 'translateY(0)', opacity: '1', position: 'relative' })),
  transition('void => *', [
    style({ transform: 'translateY(-100%)', visibility: 'hidden', height: '0', opacity: '0' }),
    animate(150, style({})),
    style({ visibility: 'visible', height: '*' }),
    animate(150, style({ transform: 'translateY(0)', opacity: '1' }))
  ]),
  transition('* => void', [
    animate(150, style({ transform: 'translateY(100%)', opacity: '0' })),
  ])
])