
import Util from './util';

export const G_webBaseUrl = window.location.host;
export const G_apiBaseUrl = `${G_webBaseUrl}/${process.env.REACT_APP_api_base_url}`;

let jwtToken = window.localStorage.getItem('security-token');
let apiopt = { async: true };

export function setToken(token) { window.localStorage.setItem('security-token', jwtToken=token); }

function fetchApi(method, path, body, headers_in, nonJson)
{
  const base  = G_apiBaseUrl;
  const mode  = 'cors';
  const cache = 'no-cache';
  const headers = Object.assign({'Content-Type': 'application/json'}, headers_in);

  if (jwtToken) headers.Authorization = `Bearer ${jwtToken}`;

  path = window.location.protocol + '//' + `${base}/${path}`.replace(/(^\/|\/{2,})/g, '/');
  if (body) body = Util.toJson(body);
  let opt = {method, headers, body, mode, cache};
  Object.assign(opt, apiopt);
  return fetch(path, opt)
    .catch(reason => {
      console.error(reason.message);
    })
    .then( async (resp) =>
    {
      if (!resp) return { status: 0, success: false, error: 'Cannot connect to the server.' };
      switch (resp.status) {
        case 500:
        case 400: return { status: resp.status, success: false, error: await resp.text() };
        case 403: window.location.href = "/"; return;
        case 404: throw new Error('Resource is not found');
      }
      if (nonJson) return resp;
      if (200 == resp.status) return await resp.json();
      return resp;
    });
}

export function getApi(path, nonJson) { return fetchApi('GET', path, null, null, nonJson||false); }
export function postApi(path, body, nonJson) { return fetchApi('POST', path, body, null, nonJson||false); }
function putApi(path, body) { return fetchApi('PUT', path, body); }
function deleteApi(path, body) { return fetchApi('DELETE', path, body); }

class ApiController
{
  sync() { apiopt.async = false; }
  async() { apiopt.async = true; }

  //----------------------------------------------------------
  createRoom(name)
  {
    return postApi('room', { name });
  }

  //----------------------------------------------------------
  get Token() { return jwtToken; }

}

//---------------------------------------------------------------------------
const API = new ApiController();
let ApiReady;

if (jwtToken) {
  ApiReady = Promise.all([
    API.validateToken(),
    API.getCompanyInfo().then(data => {
      Object.freeze(window.DATA = data);
    }),
  ]);
} else {
  ApiReady = (async () => false)();
}



export { ApiReady, API };
export default API;
