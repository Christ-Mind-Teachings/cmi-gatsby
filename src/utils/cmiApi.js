const userEndpoint =
  'https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest';
const searchEndpoint =
  'https://x5rigstpd2.execute-api.us-east-1.amazonaws.com/latest/search';

/**
 * Fetch an array of quotes Id's by sid and userId
 *
 * @param {string} sid - source Id (wom = "10")
 * @param {string} userId - user Id who defined quotes
 */
export async function getQuoteKeys(sid, userId) {
  const url = `${userEndpoint}/quoteKeys/${userId}/${sid}`;

  const resp = await fetch(url);
  const data = await resp.json();

  return data.keys;
}

/**
 * Fetch quote for userId, paraKey, and creationDate
 *
 * @param {string} userId - userId of quote creator
 * @param {string} paraKey - key of page containing quote
 * @param {string} creationDate - date quote was created
 * @returns {object} quote {quote.quote, quote.url, quote.citation}
 */
export async function getQuote(userId, paraKey, creationDate) {
  const url = `${userEndpoint}/quote/${userId}/${paraKey}/${creationDate}`;

  const resp = await fetch(url);
  const { quote } = await resp.json();

  // fix quote url to remove '/t' as used by CMI Jekyll
  quote.url = quote.url.substring(2);
  return quote;
}

/**
 * Query annotation from database.
 *
 * @async
 * @param {object} keyInfo
 * @param {string} keyInfo.userId - Id of user who created the annotation
 * @param {string} keyInfo.creationDate - annotation creation date
 * @param {string} keyInfo.paraKey - id of page containing annotation
 * @returns {object} null or queried annotation
 */
export async function fetchAnnotation(keyInfo) {
  const { userId, paraKey, creationDate } = keyInfo;
  const url = `${userEndpoint}/annotation/${userId}/${paraKey}/${creationDate}`;

  const raw = await fetch(url);
  const { response } = await raw.json();

  if (!response.userId) {
    return null;
  }

  // parse the annotation selectedText if present
  if (response.annotation.selectedText) {
    response.annotation.selectedText = JSON.parse(
      response.annotation.selectedText
    );
  }
  response.annotation.userId = response.userId;
  response.annotation.creationDate = response.creationDate;

  return response.annotation;
}

/**
 * Search throughout all content of a source for matches to a query.
 *
 * @param {string} query - search term or phrase
 * @param {string sourceId - source identifier (wom = 10)
 * @param {string} auth - authorization token, used by acol only. Full access when value is 'acol'
 */
export async function runSearchQuery(query, sourceId, auth) {
  const raw = await fetch(searchEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      source: sourceId,
      authorization: auth || sourceId,
    }),
  });

  const queryResult = await raw.json();

  return queryResult;
}

/**
 * Fetch users email list. Returns [] if user has no list.
 *
 * @param {string} userId
 */
export async function getMailList(userId) {
  const url = `${userEndpoint}/mailList/${userId}`;

  const resp = await fetch(url);
  const result = await resp.json();

  return result.mailList;
}

/**
 *
 * @param {object} mailInfo
 */
export async function sendMail(mailInfo) {
  const url = `${userEndpoint}/share`;

  const raw = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mailInfo),
  });

  const queryResult = await raw.json();
  return {
    ok: raw.ok,
    message: raw.ok ? 'success' : queryResult.errorMessage,
  };
}
