import { IUserList } from "./userlist"

export interface IResType {
    token: string,
    code: number,
    msg: string
}
export interface IUserListType {
    data: any[],
    code: number,
    msg: string
}
export interface IInfoType {
    code: number,
    msg: string
}
export interface IGetInfoType {
    code: number,
    msg: string,
    data: IUserList
}