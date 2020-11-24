/**
 *  Increment the id by one. This is needed because paragraph id's are one greater
 *  than that returned by the search api.
 * @param {String} p - this is the id of the paragraph a search hit is found in
 */
export function incrementLocation(p) {
  const pid = parseInt(p.substr(1), 10);
  return `p${pid + 1}`;
}

/**
 * Format time in seconds to 0:00:00
 *
 * @param {number} s - time in seconds
 * @returns {String} as '0:00:00'
 */
export function formatTime(s) {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - hours * 3600) / 60);
  const seconds = s - hours * 3600 - minutes * 60;

  return `${hours.toString().padStart(1, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
