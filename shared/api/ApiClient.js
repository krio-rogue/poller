import fetch       from 'isomorphic-fetch';
import queryString from 'query-string';
import Promise     from 'bluebird';

export default class ApiClient {
    constructor({ prefix = 'api/v1' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            body: payload,
            params
        });
    }

    put(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    patch(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    post(requestUrl, payload = {}) {
        console.log('post', payload);
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload
        });
    }

    delete(requestUrl) {
        return this.request({
            url: requestUrl,
            method: 'delete'
        });
    }

    request({ url, method, params = {}, body }) {
        const urlWithQuery = `${url}?${queryString.stringify(params)}`;

        const init = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if (method !== 'get' && method !== 'head') {
            init.body = JSON.stringify(body);
        }

        console.log(init);

        return fetch(`${this.prefix}/${urlWithQuery}`, init).then(res => {
            if (res.status >= 400) {
                throw new Error('Bad response from server');
            }

            return res.json();
        }).then(data => {
            console.log('then', data);

            if (data && data.status === 1) {
                return data;
            }

            return Promise.reject(data.error);
        });
    }
}