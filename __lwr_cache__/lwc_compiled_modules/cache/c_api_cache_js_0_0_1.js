import { registerDecorators as _registerDecorators } from "lwc";
class CacheableItem {
  constructor(value, lifespan) {
    this.value = void 0;
    this.expires = void 0;
    this.value = value;
    this.expires = Date.now() + lifespan;
  }
  isFresh() {
    return Date.now() < this.expires;
  }
}
_registerDecorators(CacheableItem, {
  fields: ["value", "expires"]
});
const lifespanInMillis = 1000 * 60 * 24 * 7;
function getResponse(uri) {
  let cachedValue = JSON.parse(localStorage.getItem(uri));
  console.log(cachedValue);
  if (!cachedValue || !cachedValue.isFresh()) {
    localStorage.removeItem(uri);
    return null;
  }
  return cachedValue.value;
}
function cacheResponse(uri, response) {
  let val = new CacheableItem(response, lifespanInMillis);
  localStorage.setItem(uri, JSON.stringify(val));
}
function removeCachedValue(uri) {
  localStorage.removeItem(uri);
}
export { getResponse, cacheResponse, removeCachedValue };