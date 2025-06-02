import { AxiosResponse } from "axios";

export type Response<T = any> = Promise<AxiosResponse<T>>;
