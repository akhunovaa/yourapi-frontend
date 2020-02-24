import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import Alert from "react-s-alert";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8'
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

const requestGet = (options) => {
    const headers = new Headers({
        'Accept': 'application/json;charset=UTF-8'
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

    return request({
        url: API_BASE_URL + "/individual/me",
        method: 'GET'
    });
}

export function checkLocalStorage() {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function profileInfoUpdate(mainInfoRequest) {
    return request({
        url: API_BASE_URL + "/individual/update",
        method: 'POST',
        body: JSON.stringify(mainInfoRequest)
    });
}

export function profilePasswordUpdate(passDataRequest) {
    return request({
        url: API_BASE_URL + "/individual/password",
        //url: "http://127.0.0.1:7000/individual/password",
        method: 'POST',
        body: JSON.stringify(passDataRequest)
    });
}

export function profileImageUpdate(formData) {
    return requestImage({
        url: API_BASE_URL + "/individual/image/upload",
        //url: "http://127.0.0.1:7000/individual/image/upload",
        method: 'POST',
        body: formData
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function feedback(feedbackRequest) {
    return request({
        url: API_BASE_URL + "/admin/feedback",
        method: 'POST',
        body: JSON.stringify(feedbackRequest)
    });
}

export function dataListGet(roleAdmin) {
    if (roleAdmin) {
        return requestGet({
            //url: API_BASE_URL + "/mobile/full",
            url: "http://localhost:8016" + "/mobile/full",
            method: 'GET'
        });
    }else {
        return requestGet({
            //url: API_BASE_URL + "/mobile/list",
            url: "http://localhost:8016" + "/mobile/list",
            method: 'GET'
        });
    }
}

export function deviceDeleteRequestSend(deviceId) {
    const query = "?device_id=" + deviceId;
    return requestGet({
        url: API_BASE_URL + "/mobile/data/delete"  + query,
        method: 'GET',
    });
}

export function newApiUploadSend(preparedRequest, formData) {
    const url = API_BASE_URL + "/api-data/create";
    preparedRequest.open("POST", url);
    preparedRequest.setRequestHeader('Accept','application/json;charset=UTF-8');
    if(localStorage.getItem(ACCESS_TOKEN)) {
        preparedRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }
    preparedRequest.send(formData);
    let jobLst = preparedRequest.responseText;
    preparedRequest.onreadystatechange = function() {
        if(preparedRequest.readyState === XMLHttpRequest.DONE && preparedRequest.status === 200) {
            jobLst = preparedRequest.responseText;
            Alert.success('Данные успешно сохранены');
        }else {
            Alert.warning(jobLst.message);
        }
    }

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

