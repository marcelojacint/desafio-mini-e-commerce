import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CategoryDelete } from './categories/category-delete/category-delete';
import { ProductForm } from './products/product-form/product-form';
import { CategoryCreate } from './categories/category-create/category-create';
import { ProductListComponent } from './products/product-list/product-list';

export const routes: Routes = [

    {
        path: '', 
        component: Home
    },

    {
        path: 'products', 
        children: [ 
            { path: '', component: ProductListComponent },
            { path: 'cards', component: ProductListComponent },
            { path: 'new', component: ProductForm }
        

    ]},

    { 
        path: 'categories/new', 
        component: CategoryCreate 
    },

    {
        path: 'categories/delete',
        component: CategoryDelete
    }

];
