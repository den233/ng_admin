import { Inject, Optional } from '@angular/core';
import { SFSchema, ErrorData, DelonFormConfig } from '@delon/form';

declare var Ajv: any;

export abstract class SchemaValidatorFactory {
    abstract createValidatorFn(
        schema: SFSchema,
        extraOptions: { ingoreKeywords: string[] },
    ): (value: SFSchema) => ErrorData[];
}

export class CustomSchemaValidatorFactory extends SchemaValidatorFactory {
    protected ajv: any;

    constructor(
        @Optional()
        @Inject(DelonFormConfig)
        private options: DelonFormConfig,
    ) {
        super();
        this.ajv = new Ajv(
            Object.assign({}, options.ajv, {
                errorDataPath: 'property',
                allErrors: true,
                jsonPointers: true,
            }),
        );
        this.ajv.addFormat(
            'data-url',
            /^data:([a-z]+\/[a-z0-9-+.]+)?;name=(.*);base64,(.*)$/,
        );
        this.ajv.addFormat(
            'color',
            /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
        );
    }

    createValidatorFn(
        schema: SFSchema,
        extraOptions: { ingoreKeywords: string[] },
    ): (value: any) => ErrorData[] {
        const ingoreKeywords: string[] = []
            .concat(this.options.ingoreKeywords)
            .concat(extraOptions.ingoreKeywords);

        return (value: any): ErrorData[] => {
            try {
                this.ajv.validate(schema, value);
            } catch (e) {
                // swallow errors thrown in ajv due to invalid schemas, these
                // still get displayed
            }
            let errors = this.ajv.errors;

            if (this.options && ingoreKeywords && errors) {
                errors = errors.filter(w => ingoreKeywords.indexOf(w.keyword) === -1);
            }
            // console.log('ajv ...', schema, JSON.stringify(errors));
            return errors;
        };
    }
}
