import { style, animate, trigger, transition, state } from '@angular/animations';


export const init_animation = (speed_in: number, speed_out: number, delay: number, components: Array<string>) => {
  return components.map((component, index) => {
    return trigger(component, [
      state("validate", style({
        opacity: 0,
      })),
      transition('* => init', [
        style({
          transform: "translateY(200px)",
          opacity: 0,
        }),
        animate(speed_in + 'ms ' + delay * (index + 1) + 'ms cubic-bezier(.22,1.58,.77,1)'),
      ]),
      state("logged_in", style({
        transform: "translateY(-1000px)",
        opacity: 0,
      })),
      transition('* => logged_in', [
        animate(speed_out + 'ms ' + delay * (index + 1) + 'ms cubic-bezier(.98,-0.02,.95,.68)'),
      ])
    ])
  })
}