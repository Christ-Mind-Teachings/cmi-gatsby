/**
 *  Increment the id by one. This is needed because paragraph id's are one greater
 *  than that returned by the search api.
 * @param {String} p - this is the id of the paragraph a search hit is found in
 */
export function incrementLocation(p) {
  const pid = parseInt(p.substr(1), 10);
  return `p${pid + 1}`;
}
