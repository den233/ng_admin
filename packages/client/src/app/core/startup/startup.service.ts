import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN, Menu } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';
import { CoreService } from 'generated';
import * as treeify from 'array-to-tree';
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private translate: TranslateService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private coreService: CoreService,
        private injector: Injector) { }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            zip(
                this.httpClient.get(`assets/i18n/${this.i18n.defaultLang}.json`),
                this.coreService.settingGetSettingsByName('main'),
                this.coreService.menuGetUserMenus(),
            ).pipe(
                // 接收其他拦截器后产生的异常消息
                catchError(([langData, settingsData, menuData]) => {
                    resolve(null);
                    return [langData, settingsData, menuData];
                })
            ).subscribe(([langData, settings, menuData]) => {
                // setting language data
                this.translate.setTranslation(this.i18n.defaultLang, langData);
                this.translate.setDefaultLang(this.i18n.defaultLang);

                this.settingService.setApp(settings);

                // ACL：设置权限为全量
                this.aclService.setFull(true);
                // 初始化菜单

                // 设置页面标题的后缀
                this.titleService.suffix = settings.name;

                if (menuData && Array.isArray(menuData)) {
                    const menus = menuData.map((item) => {
                        return {
                            id: item.id,
                            text: item.name,
                            group: item.group,
                            icon: item.icon,
                            link: item.link,
                            parent: item.parent
                        };
                    });

                    const tree = treeify(menus, {
                        parentProperty: 'parent',
                        customID: 'id'
                    });

                    this.menuService.add([{
                        text: '主导航',
                        group: true,
                        children: tree
                    }]);
                }
            },
                () => { },
                () => {
                    resolve(null);
                });
        });
    }
}
