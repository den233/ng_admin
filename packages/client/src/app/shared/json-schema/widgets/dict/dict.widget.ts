import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ControlWidget, SFSchemaEnum, SFSchema, SFUISchemaItem, SFComponent, SFSchemaEnumType } from '@delon/form';
import { getData } from './../../util';
// tslint:disable-next-line:import-blacklist
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'sf-dict',
    template:
        `<sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
    <nz-select
      [nzDisabled]="disabled"
      [nzSize]="ui.size"
      [ngModel]="value"
      (ngModelChange)="setValue($event)"
      [nzPlaceHolder]="ui.placeholder"
      [nzAllowClear]="i.allowClear"
      [nzAutoFocus]="i.autoFocus"
      [nzDropdownClassName]="i.dropdownClassName"
      [nzDropdownMatchSelectWidth]="i.dropdownMatchSelectWidth"
      [nzServerSearch]="i.serverSearch"
      [nzMaxMultipleCount]="i.maxMultipleCount"
      [nzMode]="i.mode"
      [nzNotFoundContent]="i.notFoundContent"
      [nzShowSearch]="i.showSearch"
      (nzOpenChange)="openChange($event)"
      (nzOnSearch)="searchChange($event)"
      (nzScrollToBottom)="scrollToBottom($event)">
      <ng-container *ngIf="!hasGroup">
        <nz-option
          *ngFor="let o of data"
          [nzLabel]="o.label"
          [nzValue]="o.value"
          [nzDisabled]="o.disabled">
        </nz-option>
      </ng-container>
      <ng-container *ngIf="hasGroup">
        <nz-option-group *ngFor="let i of data" [nzLabel]="i.label">
          <nz-option
            *ngFor="let o of i.children"
            [nzLabel]="o.label"
            [nzValue]="o.value"
            [nzDisabled]="o.disabled">
          </nz-option>
        </nz-option-group>
      </ng-container>
    </nz-select>
  </sf-item-wrap>`,
    preserveWhitespaces: false,

})
export class DictWidgetComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'dict';

    i: any;
    data: SFSchemaEnum[];
    hasGroup = false;

    constructor(
        @Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
        @Inject(SFComponent) public readonly sfComp: SFComponent,
        public client: HttpClient,
    ) {
        super(cd, sfComp);
    }

    ngOnInit(): void {
        this.i = {
            allowClear: this.ui.allowClear,
            autoFocus: this.ui.autoFocus || false,
            dropdownClassName: this.ui.dropdownClassName || null,
            dropdownMatchSelectWidth: this.ui.dropdownMatchSelectWidth || true,
            serverSearch: this.ui.serverSearch || false,
            maxMultipleCount: this.ui.maxMultipleCount || Infinity,
            mode: this.ui.mode || 'default',
            notFoundContent: this.ui.notFoundContent || '无法找到',
            showSearch: this.ui.showSearch || true,
        };
    }

    getRemoteData(value: string, text?: string): Observable<SFSchemaEnumType[]> {
        const category = this.ui.category;
        const url = `api/dict/search`;
        return this.client.get(url, {
            params: {
                keyword: text || '',
                value: value,
                category: category,
            }
        }) as any;
    }

    reset(value: any) {
        this.ui.asyncData = () => this.getRemoteData(value);
        this.ui.onSearch = (text: string) => this.getRemoteData(value, text);
        getData(this.schema, this.ui, this.formProperty.formData).subscribe(
            list => {
                this.data = list;
                this.hasGroup = list.filter(w => w.group === true).length > 0;
                this.detectChanges();
            },
        );
    }

    openChange(value: any) {
        if (this.ui.openChange) this.ui.openChange(value);
    }

    searchChange(text: string) {
        if (this.ui.onSearch) {
            this.ui.onSearch(text).subscribe((res: any[]) => {
                this.data = res;
                this.detectChanges();
            });
            return;
        }
        this.detectChanges();
    }

    scrollToBottom(value: any) {
        if (this.ui.scrollToBottom) this.ui.scrollToBottom(value);
    }
}
