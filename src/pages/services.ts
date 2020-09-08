import request from 'umi-request';

interface upData {
    page: string;
}

interface getUrlData {
    originPage: string;
    searchPage: string;
}

export async function upRecord(params: upData) {
    return request('http://api.sanqi.us/api/recordip', { params })
}

export async function getUrl(params: getUrlData) {
    return request('http://api.sanqi.us/api/GetJxAddress', { params })
}

export async function sendMail(params: any) {
    return request('http://api.sanqi.us/api/sendMail', {
        method: 'post',
        data: params
    })
}