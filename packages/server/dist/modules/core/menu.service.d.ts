import { Appearance } from '../../types/appearance';
import { MenuResponse, EditMenuDto, CreateMenuDto, PaginateMenu } from './dto/menu.dto';
import { KeyValue } from '../../types/data.types';
import { SessionUser } from './dto/account.dto';
export declare class MenuService {
    getAppearance(): Promise<Appearance>;
    getAllPermissionTags(): Promise<{
        id: any;
        name: string;
        desc: string;
    }[]>;
    search(keyword?: string, value?: string, limit?: number): Promise<Array<KeyValue>>;
    create(entry: CreateMenuDto): Promise<MenuResponse>;
    update(entry: EditMenuDto): Promise<MenuResponse>;
    query(keyword?: string, isMenu?: boolean, page?: number, size?: number, sort?: string): Promise<PaginateMenu>;
    remove(id: string): Promise<boolean>;
    get(id: string): Promise<MenuResponse>;
    getAuthenticatedMenus(user: SessionUser): Promise<Array<MenuResponse>>;
    private pure(entry);
}
