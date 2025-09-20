import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { ViewProductDetialsComponent } from './products/view-product-detials/view-product-detials.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product-details',
    component: ViewProductDetialsComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./payments/payments.module').then((m) => m.PaymentsModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('./branch/branch.module').then((m) => m.BranchModule),
      },
      {
        path: 'sale-reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'warehouse',
        loadChildren: () =>
          import('./warehouse/warehouse.module').then((m) => m.WarehouseModule),
      },
      {
        path: 'supplier',
        loadChildren: () =>
          import('./supplier/supplier.module').then((m) => m.SupplierModule),
      },
      {
        path: 'warehouse-stock',
        loadChildren: () =>
          import('./warehouse-stock/warehouse-stock.module').then(
            (m) => m.WarehouseStockModule
          ),
      },
    ],
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'generate-invoice',
        component: GenerateInvoiceComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
