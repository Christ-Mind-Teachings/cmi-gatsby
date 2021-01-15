import wom from './wom';
import pwom from './pwom';
import raj from './raj';
import oe from './oe';
import sp from './sp';
import acol from './acol';

/*
 * Modify the value of sourceId (sid) to match changes from the
 * jekyll site to this one.
 */
function adjustSource(sid) {
  if (sid === 'acimoe') {
    return 'acim/oe';
  }

  if (sid === 'acim') {
    return 'acim/sp';
  }
  return sid;
}

/*
 * Modify unit value coming from the server to match changes
 * from the jekyll site to this one.
 */
function adjustUnit(sourceId, bookId, unit) {
  if ((sourceId === 'acimoe' || sourceId === 'acim') && bookId === 'text') {
    const pos = unit.indexOf('/');
    if (pos > -1) {
      return unit.substring(pos + 1);
    }
  }
  // remove '/' from unit.url if present, this was used for questions and no longer needed
  return unit.replace('/', '');
}

function formatter(sourceId, books, pages, hits, t, language) {
  // Add title and resolve url for search matches
  // - prepare to combine matches in the same unit by adding 'newUnit'
  const formatted = books
    .map((b) => {
      const f = {};
      let unitId = '';
      if (hits[b.bookId]) {
        f.bookId = b.bookId;
        f.title = b.title;
        f.count = hits[b.bookId].length;
        f.units = hits[b.bookId].map((u) => {
          const unit = adjustUnit(sourceId, b.bookId, u.unit);
          const url = `/${adjustSource(sourceId)}/${b.bookId}/${unit}`;
          const unitInfo = pages.find((i) => i.url === `/${language}${url}`);
          const title = unitInfo ? unitInfo.title : t('Title Not Found');
          const newUnit = unit !== unitId;

          if (newUnit) {
            unitId = unit;
          }
          return {
            url,
            title,
            location: u.location,
            context: u.context,
            newUnit,
          };
        });
      }
      return f;
    })
    // remove books with no search matches
    .filter((i) => i.title)
    // combine all matches in a unit into hits[]
    .map((b) => {
      const unitArray = [];
      let index = -1;

      for (let u = 0; u < b.units.length; u += 1) {
        if (b.units[u].newUnit) {
          index += 1;
          unitArray[index] = {
            url: b.units[u].url,
            title: b.units[u].title,
            hits: [
              { location: b.units[u].location, context: b.units[u].context },
            ],
          };
        } else {
          unitArray[index].hits.push({
            location: b.units[u].location,
            context: b.units[u].context,
          });
        }
      }

      b.units = unitArray;
      return b;
    });

  const result = {
    count: hits.count,
    query: hits.query,
    matches: formatted,
  };

  // ACOL restricts query results to authorized users
  if (hits.restricted) {
    result.count = hits.count - hits.restricted;
    result.restricted = hits.restricted;
  }

  return result;
}

export default function formatSearchResults(hits, t, language) {
  console.log('hits: %o', hits);
  switch (hits.source) {
    case 'wom':
      return formatter('wom', wom.books, wom.pages, hits, t, language);
    case 'raj':
      return formatter('raj', raj.books, raj.pages, hits, t, language);
    case 'acol':
      return formatter('acol', acol.books, acol.pages, hits, t, language);
    case 'pwom':
      return formatter('pwom', pwom.books, pwom.pages, hits, t, language);
    // 'acimoe' identifies 'oe' in search results
    case 'acimoe':
      return formatter('acimoe', oe.books, oe.pages, hits, t, language);
    case 'acim':
      return formatter('acim', sp.books, sp.pages, hits, t, language);
    default:
      break;
  }
}
