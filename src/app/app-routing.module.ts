import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { LandingComponent } from './views/landing/landing.component'
import { SystemUserComponent } from './views/system-user/system-user.component';
import { ConfigureExchangeComponent } from './views/configure-exchange/configure-exchange.component';
import { ForgotPasswordComponent } from './views/pages/forgotPassword/forgot-password.component';
import { RePasswordComponent } from './views/pages/rePassword/re-password.component';
import { ProfileComponent } from './views/profile/profile.component'

import { AuthGuard } from '../utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'trading-bots',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/trading-bots/trading-bot.module').then((m) => m.TradingBotModule)
      },
      {
        path: 'smart-trading',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/smart-trade/smart-trade-routing.module').then((m) => m.SmartTradeRoutingModule)
      },
      {
        path: 'system-users',
        canActivate: [AuthGuard],
        component: SystemUserComponent,
        data: {
          title: 'System Users'
        }
      },
      {
        path: 'configure-exchange',
        canActivate: [AuthGuard],
        component: ConfigureExchangeComponent,
        data: {
          title: 'Configured Exchange'
        }
      },
      {
        path: "profile",
        component: ProfileComponent,
        data: {
          title: "Profile"
        }
      }
    ]
  },
  {
    path: "landing",
    component: LandingComponent,
    data: {
      title: 'Landing'
    }
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 're-password/:token',
    component: RePasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
