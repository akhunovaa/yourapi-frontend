import {ACCESS_DENIED_MESSAGE, ACCESS_TOKEN, API_BASE_URL} from '../constants';

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                checkResponseForAvalidToken(json);
                return json;
            })
        ).catch(error => console.log(error))
};

const requestGet = async (options) => {
    const headers = new Headers({
        'Accept': 'application/json;charset=UTF-8'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                checkResponseForAvalidToken(json);
                return json;
            })
        );
};

const requestApiTestGet = async (options) => {

    options = Object.assign({}, options);

    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
};

const requestImage = async (options) => {

    const headers = new Headers({
        'Accept': 'application/json'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                checkResponseForAvalidToken(json);
                return json;
            })
        );
};

const requestFileSend = async (options) => {

    const headers = new Headers({
        'Accept': 'application/json'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                checkResponseForAvalidToken(json);
                return json;
            })
        );
};

const prevalidateTokenState = () => {
    if (localStorage !== undefined && !localStorage.getItem(ACCESS_TOKEN)) {
        window.location.reload();
        return Promise.reject("No access token set.");
    }
};

const checkResponseForAvalidToken = (message) => {
    if (message.success === false && message.message === ACCESS_DENIED_MESSAGE) {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.reload();
        return Promise.reject(message);
    }
};

export function getCurrentUser() {
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/individual/me",
        method: 'GET'
    });
}

export function checkLocalStorage() {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function login(loginRequest) {
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function profileInfoUpdate(mainInfoRequest) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/individual/update",
        method: 'POST',
        body: JSON.stringify(mainInfoRequest)
    });
}

export function overviewInformationUpdate(mainInfoRequest) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/api-data/update",
        method: 'POST',
        body: JSON.stringify(mainInfoRequest)
    });
}

export function profilePasswordUpdate(passDataRequest) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/individual/password",
        method: 'POST',
        body: JSON.stringify(passDataRequest)
    });
}

export function profileImageUpdate(formData) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return requestImage({
        url: apiBaseUrl + "/individual/image/upload",
        method: 'POST',
        body: formData
    });
}

export function apiProjectImageUpdate(formData) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return requestImage({
        url: apiBaseUrl + "/api-data/image/upload",
        method: 'POST',
        body: formData
    });
}

export function signup(signupRequest) {
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function apiProjectListGet() {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/api-data/list",
        method: 'GET'
    });
}

export function apiProjectGet(apiProjectId) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/api-data/get/" + apiProjectId,
        method: 'GET'
    });
}

export function apiTestRequestSend(url) {
    prevalidateTokenState();
    return requestApiTestGet({
        url: url,
        method: 'GET'
    });
}

export function apiProjectFullListGet() {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/api-data/full",
        method: 'GET'
    });
}

export function apiFullListGet() {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV   !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/api-data/shop/filter",
        method: 'GET'
    });
}

export function newApiUploadSend(formData) {
    prevalidateTokenState();
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    const url = apiBaseUrl + "/api-data/create";
    return requestFileSend({
        url: url,
        method: 'POST',
        body: formData
    });
}

export function loadUser(paramData) {
    let query = Object.keys(paramData)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(paramData[k]))
        .join('&');

    return request({
        url: API_BASE_URL + "/individual/info" + query,
        method: 'GET'
    });
}

export function consume(reader) {
    let total = 0;
    return new Promise((resolve, reject) => {
        function pump() {
            reader.read().then(({done, value}) => {
                if (done) {
                    resolve();
                    return
                }
                total += value.byteLength;
                console.log((`received ${value.byteLength} bytes (${total} bytes in total)`))
                pump()
            }).catch(reject)
        }
        pump()
    })
}

