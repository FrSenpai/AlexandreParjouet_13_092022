import { DateTime } from 'luxon';
import store from "../store/store";
let header = new Headers();
header.set('Content-Type', 'application/json');
header.set('Accept', 'application/json');

function setJWT() {
    const user = store.getState().user
    if (user.auth.token !== null && user.auth.expiresAt && DateTime.now().toMillis() < user.auth.expiresAt) {
        header.set('Authorization', 'Bearer ' + user.auth.token);
    }
}

function objectToParamString(obj: any) {
    if (!obj) return '';
    var str = '?';
    for (var key in obj) {
        if (str != '?') {
            str += '&';
        }
        str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
}

export async function get(url: string, options?: {}): Promise<any> {
    setJWT()
    const res = await fetch(url + objectToParamString(options), {
        method: 'GET',
        headers: header,
    });

    const json = await res.json();
    return json;
}

export async function post(url: string, options?: {}): Promise<any> {
    setJWT()
    const res = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(options),
    });
    const json = await res.json();
    return json;
}

export async function put(url: string, options?: {}): Promise<any> {
    setJWT()
    const res = await fetch(url, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(options),
    });
    const json = await res.json();
    return json;
}

export async function delet(url: string, options?: {}): Promise<any> {
    // setBearer()
    const res = await fetch(url, {
        method: 'DELETE',
        headers: header,
        body: JSON.stringify(options),
    });

    const json = await res.json();
    return json;
}
