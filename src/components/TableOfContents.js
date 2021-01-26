import React, { useContext } from 'react';
// import { Link } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next';
import { List } from 'semantic-ui-react';
import { useI18next, I18nextContext } from 'gatsby-plugin-react-i18next';
import { IdentityContext } from './IdentityContextProvider';

function isFullACOLUser(user) {
  if (!user) {
    return false;
  }

  if (
    user.app_metadata.roles &&
    user.app_metadata.roles.find((i) => i === 'acol')
  ) {
    return true;
  }

  return false;
}

export default function TableOfContents(props) {
  const { bid, toc, unit } = props;
  const { user } = useContext(IdentityContext);
  const { language } = useContext(I18nextContext);
  const { t } = useI18next('contents');

  /*
   * If the item contains a url we render a link unless the item is restricted (ACOL only) and the
   * the user has not been granted full ACOL access. In that case we render text of the item title.
   *
   * If there is no url we return the title as a header.
   */
  function levelN(item) {
    if (item.url) {
      const acolUser = isFullACOLUser(user);
      if (item.restricted && !acolUser) {
        return item.prefix ? `${item.prefix} ${item.title}` : item.title;
      }
      return (
        <Link to={item.url} language={language}>
          {item.prefix ? `${item.prefix} ${item.title}` : t(item.title)}
        </Link>
      );
    }
    return <List.Header>{t(item.title)}</List.Header>;
  }

  function createSubList(contents, bid, pIdx, url) {
    const subList = contents.map((item, index) => (
      <List.Item
        target={item.url}
        key={`${bid}-${pIdx}-${index}`}
        active={url ? item.url === url : false}
      >
        {levelN(item)}
        {/* <span>{levelN(user, item)}</span> */}
        {item.contents
          ? createSubList(
              language,
              user,
              item.contents,
              `${bid}-ref`,
              index,
              url
            )
          : undefined}
      </List.Item>
    ));
    return <List.List>{subList}</List.List>;
  }

  /*
   * If the item contains a url we render a link unless the item is restricted
   * which happens only for ACOL and the user is not granted full ACOL access in
   * which case we just return the item title.
   *
   * If there is no url we return the title as a header
   */
  function level1(item) {
    if (item.url) {
      if (item.restricted && !isFullACOLUser(user)) {
        return item.prefix ? `${item.prefix} ${item.title}` : item.title;
      }

      /* Note regarding t(). Currently, we only need to translate content from the Get Acquainted book
       * for the main library. This doesn't relate to ACOL or prefixes so we don't add translations
       * for those paths.
       */
      return (
        <Link to={item.url} language={language}>
          {item.prefix ? `${item.prefix} ${item.title}` : t(item.title)}
        </Link>
      );
    }
    return <List.Header>{t(item.title)}</List.Header>;
  }

  const contents = toc.map((item, index) => (
    <List.Item
      target={item.url}
      key={`${bid}-${index}`}
      active={unit ? item.url === unit.url : false}
    >
      {level1(item)}
      {item.contents
        ? createSubList(item.contents, bid, index, unit ? unit.url : null)
        : undefined}
    </List.Item>
  ));

  return <List className="tocStyle">{contents}</List>;
}
