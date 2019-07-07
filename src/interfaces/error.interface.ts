export interface IHttpResponseBase {
    code: number;
    message: string | object;
    timestamp: string;
    path: string;
    method: string;
}
