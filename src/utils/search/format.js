import wom from './wom';
import pwom from './pwom';
import raj from './raj';

function formatter(sourceId, books, pages, hits) {
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
          // remove '/' from unit.url if present, this was used for questions and no longer needed
          const unit = u.unit.replace('/', '');
          const url = `/${sourceId}/${b.bookId}/${unit}`;
          const unitInfo = pages.find((i) => i.url === url);
          const title = unitInfo ? unitInfo.title : 'Title Not Found';
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

  return { count: hits.count, query: hits.query, matches: formatted };
}

export default function formatSearchResults(hits) {
  switch (hits.source) {
    case 'wom':
      return formatter('wom', wom.books, wom.pages, hits);
    case 'raj':
      return formatter('raj', raj.books, raj.pages, hits);
    case 'pwom':
      return formatter('pwom', pwom.books, pwom.pages, hits);
    default:
      break;
  }
}
