
import coreControllers from './../modules/core/core.controllers';
import cmsControllers from './../modules/cms/cms.controllers';
export const controllers: Array<any> =
    [...coreControllers,
    ...cmsControllers]
