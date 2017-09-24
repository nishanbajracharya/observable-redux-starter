import axios from 'axios';
import { Observable } from 'rxjs/Observable';

axios.defaults.responseType = 'json';

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function get(url, { params = {}, responseType = 'json', headers = {} } = {}) {
  return Observable.fromPromise(
    axios({
      url: url,
      method: 'get',
      params: params,
      headers: headers,
      responseType: responseType,
    })
  ).map(
    response =>
      response && response.data && !response.metadata ? response.data : response
  );
}

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Object} [config.body] An object that will be sent in the request
 * body
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function post(url, { params = {}, body = {}, headers = {} } = {}) {
  return Observable.fromPromise(
    axios({
      url: url,
      data: body,
      method: 'post',
      params: params,
      headers: headers,
    })
  ).map(response => (response && response.data ? response.data : response));
}

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Object} [config.body] An object that will be sent in the request
 * body
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function put(url, { params = {}, body = {}, headers = {} } = {}) {
  return Observable.fromPromise(
    axios({
      url: url,
      data: body,
      method: 'put',
      params: params,
      headers: headers,
    })
  ).map(response => (response && response.data ? response.data : response));
}

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function remove(url, { params = {}, headers = {} } = {}) {
  return Observable.fromPromise(
    axios({
      url: url,
      params: params,
      method: 'delete',
      headers: headers,
    })
  ).map(response => (response && response.data ? response.data : response));
}

export default {
  get,
  put,
  post,
  delete: remove,
};
