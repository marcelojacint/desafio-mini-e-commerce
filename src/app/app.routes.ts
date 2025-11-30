import { Routes } from '@angular/router';
import { CategoryCreate } from './categories/category-create/category-create';
import { Home } from './home/home';
import { CategoryDelete } from './categories/category-delete/category-delete';

export const routes: Routes = [
    {
        path: '',
        component: Home 
    },

    { 
        path: 'categories/new', 
        component: CategoryCreate 
    },

    {
        path: 'categories/delete',
        component: CategoryDelete
    }

];
