import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CoreService } from 'generated';
import { UserService } from '@services/user.service';

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
            {{settings.user.name}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
            <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent implements OnInit {
    constructor(
        public settings: SettingsService,
        public coreService: CoreService,
        private router: Router,
        private userService: UserService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) { }

    ngOnInit(): void {
        // this.tokenService.change().subscribe((res: any) => {
        //     this.settings.setUser(res);
        // });
        // mock
        // const token = this.tokenService.get() || {
        //     token: 'nothing',
        //     name: 'Admin',
        //     avatar: './assets/img/zorro.svg',
        //     email: 'vellengs@qq.com'
        // };
        // this.tokenService.set(token);
    }

    async  logout() {
        // await this.coreService.userLogout().toPromise();
        await this.userService.logout();
        this.router.navigateByUrl(this.tokenService.login_url);
        this.tokenService.clear();
    }
}
