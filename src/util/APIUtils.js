import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

const requestGet = async (options) => {
    const headers = new Headers({
        'Accept': 'application/json;charset=UTF-8'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return await fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

const requestImage = (options) => {

    const headers = new Headers({
        'Accept': 'application/json'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
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
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/individual/update",
        method: 'POST',
        body: JSON.stringify(mainInfoRequest)
    });
}

export function overviewInformationUpdate(mainInfoRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/api-data/update",
        method: 'POST',
        body: JSON.stringify(mainInfoRequest)
    });
}

export function profilePasswordUpdate(passDataRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return request({
        url: apiBaseUrl + "/individual/password",
        method: 'POST',
        body: JSON.stringify(passDataRequest)
    });
}

export function profileImageUpdate(formData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return requestImage({
        url: apiBaseUrl + "/individual/image/upload",
        method: 'POST',
        body: formData
    });
}

export function apiProjectImageUpdate(formData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
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
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return requestGet({
        url: apiBaseUrl + "/api-data/list",
        method: 'GET'
    });
}

export function apiProjectFullListGet() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    return requestGet({
        url: apiBaseUrl + "/api-data/full",
        method: 'GET'
    });
}

export function newApiUploadSend(preparedRequest, formData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'https://dev.yourapi.ru' : API_BASE_URL;
    const url = apiBaseUrl + "/api-data/create";
    preparedRequest.open("POST", url);
    preparedRequest.setRequestHeader('Accept','application/json;charset=UTF-8');
    if(localStorage.getItem(ACCESS_TOKEN)) {
        preparedRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }
    preparedRequest.send(formData);
}

export function loadUser(paramData) {
    let query = Object.keys(paramData)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(paramData[k]))
        .join('&');

    return request({
        url: API_BASE_URL + "/individual/info"  + query,
        method: 'GET'
    });
}

