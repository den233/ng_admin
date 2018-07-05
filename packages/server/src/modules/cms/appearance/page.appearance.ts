import { Appearance, SchemaTypes as t, WidgetTypes as w, FormDefine } from "../../../types/appearance";
import { cloneDeep } from 'lodash';
import { SFSchema } from "../../../types/schema.types";

const addForm: SFSchema = {
    title: '新建页面',
    properties: {
        title: {
            title: '标题',
            type: t.string,
            ui: {
                grid: {
                    span: 16
                }
            }
        },
        name: {
            title: '网址',
            type: t.string,
            ui: {
                widget: 'text',
                grid: {
                    span: 16
                }
            }
        },
        keyword: {
            title: '关键词',
            type: t.string
        },
        description: {
            title: '摘要',
            type: t.string,
            ui: {
                widget: w.textarea,
                grid: {
                    span: 24
                }
            }
        },
        content: {
            title: '内容',
            type: t.string,
            ui: {
                widget: w.umeditor,
                grid: {
                    span: 24
                }
            }
        },
    },
    required: [],
    ui: {
        spanLabelFixed: 100,
        grid: {
            span: 8
        }
    }
};

const editForm = cloneDeep(addForm);
editForm.title = '编辑页面';
editForm.required = ['username'];

export const appearance: Appearance = {
    columnSets: {
        default: [
            {
                title: '页面标题',
                index: 'title',
                type: 'link',
                action: 'edit'
            },
            {
                title: '发布时间',
                index: 'publish',
                type: 'date',
            }
        ]
    },
    formSets: {
        query: {
            properties: {
                name: {
                    title: '名称',
                    type: t.string,
                    maxLength: 30,
                    ui: {
                        placeholder: '请输入页面名称'
                    }
                }
            }
        },
        add: addForm,
        edit: editForm
    }
}
