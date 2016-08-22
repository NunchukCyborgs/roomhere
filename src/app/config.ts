export const BASE_URL = 'https://semorental.com';
export const BASE_API_URL = BASE_URL + '/api/';
export const CAPE_GIRARDEU_CENTER = {latitude: 37.3067429, longitude: -89.5286194};
export function generateGUID(): string {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}