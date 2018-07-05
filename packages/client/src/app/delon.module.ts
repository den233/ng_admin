import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders,
    SystemJsNgModuleLoader,
} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule, ReuseTabService, ReuseTabStrategy, AdSimpleTableConfig } from '@delon/abc';
import { DelonAuthModule } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
import { DelonUtilModule } from '@delon/util';
// mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '@env/environment';
const MOCKMODULE = !environment.production ? [DelonMockModule.forRoot({ data: MOCKDATA })] : [];

// region: global config functions

import { AdPageHeaderConfig } from '@delon/abc';
export function pageHeaderConfig(): AdPageHeaderConfig {
    return Object.assign(new AdPageHeaderConfig(), { home_i18n: 'home' });
}

import { DelonAuthConfig } from '@delon/auth';
import { ApiModule, Configuration } from 'generated';
import { UserService } from './services/user.service';
import { ListContext } from './services/list.context';
import { CanAdminProvide } from './services/can.admin.provide';
import { CanAuthProvide } from './services/can.auth.provide';
import { DelonFormConfig, SchemaValidatorFactory } from '@delon/form';
import { CustomSchemaValidatorFactory } from './custom.form.factory';

export function delonAuthConfig(): DelonAuthConfig {
    return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
        login_url: '/passport/login',
    });
}

export function apiConfig(): Configuration {
    return new Configuration({
        basePath: `${location.protocol}//${location.host}`
    });
}

export function simpleTableConfig() {
    return Object.assign(new AdSimpleTableConfig(), <AdSimpleTableConfig>{
        reqReName: {
            pi: 'page',
            ps: 'size'
        },
        isPageIndexReset: false,
        toTopInChange: false,
    });
}


// endregion

@NgModule({
    imports: [
        NgZorroAntdModule.forRoot(),
        AlainThemeModule.forRoot(),
        DelonABCModule.forRoot(),
        DelonAuthModule.forRoot(),
        DelonACLModule.forRoot(),
        DelonCacheModule.forRoot(),
        DelonUtilModule.forRoot(),
        // mock
        ...MOCKMODULE,
        ApiModule.forRoot(apiConfig),
    ],
    providers: [
        UserService,
        ListContext,
        CanAdminProvide,
        CanAuthProvide,
        SystemJsNgModuleLoader,
    ]
})
export class DelonModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: DelonModule,
    ) {
        throwIfAlreadyLoaded(parentModule, 'DelonModule');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DelonModule,
            providers: [
                {
                    provide: RouteReuseStrategy,
                    useClass: ReuseTabStrategy,
                    deps: [ReuseTabService],
                },
                // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `simple-table` 的页码默认为 `20` 行
                { provide: AdSimpleTableConfig, useFactory: simpleTableConfig },
                { provide: AdPageHeaderConfig, useFactory: pageHeaderConfig },
                { provide: DelonAuthConfig, useFactory: delonAuthConfig },
                {
                    provide: SchemaValidatorFactory,
                    useClass: CustomSchemaValidatorFactory,
                },
            ],
        };
    }
}
