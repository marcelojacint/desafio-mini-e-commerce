import { Routes } from '@angular/router';
import { CategoryCreate } from './categories/category-create/category-create';
import { Home } from './home/home';

export const routes: Routes = [
    {
    path: '',
    component: Home },
    { path: 'categories/new', 
        component: CategoryCreate },

];
