/**
 * rest api interface
 * 项目标准接口
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * 
 */
export interface CreateAccountDto {
    /**
     * 
     */
    avatar?: string;
    /**
     * 
     */
    email?: string;
    /**
     * 
     */
    keyword?: string;
    /**
     * 
     */
    mobile?: string;
    /**
     * 
     */
    groups?: Array<string>;
    /**
     * 
     */
    roles?: Array<string>;
    /**
     * 
     */
    username: string;
    /**
     * 
     */
    password: string;
    /**
     * 
     */
    nick: string;
}
