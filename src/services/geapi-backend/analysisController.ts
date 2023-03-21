// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInvokeInterfaceInfo GET /api/analysis/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO_>('/api/analysis/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listTopUserInvokeInterfaceInfo GET /api/analysis/top/interface/user */
export async function listTopUserInvokeInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserInterfaceVO_>('/api/analysis/top/interface/user', {
    method: 'GET',
    ...(options || {}),
  });
}
