import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

@Component({
  selector: 'cybercomplaint-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.theme.set({
        preset: Aura,
            options: {
                cssLayer: {
                    name: 'primeng',
                    //darkModeSelector: 'system',
                    order: 'tailwind-base, primeng, tailwind-utilities',
                    semantic: {
                      primary: {
                          50:  '{teal.50}',
                          100: '{teal.100}',
                          200: '{teal.200}',
                          300: '{teal.300}',
                          400: '{teal.400}',
                          500: '{teal.500}',
                          600: '{teal.600}',
                          700: '{teal.700}',
                          800: '{teal.800}',
                          900: '{teal.900}',
                          950: '{teal.950}'
                      }
                  }
                }
            }
        })
    }
}