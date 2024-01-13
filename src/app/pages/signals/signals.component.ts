import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styles: ``
})
export class SignalsComponent {
  name = signal<string>('Hanss');
  age = signal<number>(27);
  favoriteColors = signal<string[]>([]);
  num = signal<number>(5);

  num3 = computed<number>(() => this.num() * 3);

  #_lastName = signal('Espinoza');
  lastName = computed(() => this.#_lastName());

  constructor() {
    effect(() => {
      console.log(this.num());
    })
  }

  changeHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.name.set(newValue);
  }

  changeHandler2(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.age.set(parseInt(newValue));
  }

  addColors(): void {
    const colors = ['Verde', 'Azul', 'Amarillo'];
    this.favoriteColors.update((color) => {
      colors.map((item) => {
        color.push(item)
      })

      return color;
    });
  }

  count(): void {
    this.num.update((num) => num + 1)
  }
}
