import { Routes } from '@angular/router';
// import { CalculatorViewComponent } from './calculator/views/calculator-view/calculator-view.component';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      // import('./calculator/views/calculator-view/calculator-view.component'),
      import('@/calculator/views/calculator-view/calculator-view.component'),
  },
  {
    path: '**',
    redirectTo: 'calculator',
  },
];
