import React, { useRef, useEffect } from 'react';
import { Link, useI18next, Trans } from 'gatsby-plugin-react-i18next';
import { Popup, Menu, Dropdown } from 'semantic-ui-react';

function options(current, languages) {
  const others = languages.filter((l) => l !== current);
  const opt = [
    { key: 'message', text: <span>Change Language</span>, disabled: true },
  ];
  others.forEach((l) => {
    opt.push({ key: l, value: l, text: l.toUpperCase() });
  });
  return opt;
}

export const ChangeLanguage = () => {
  const { changeLanguage, originalPath, language, languages, t } = useI18next();
  const dropdown = useRef();

  // function languageSelect(e, { lang }) {
  //   // this causes a 'Cannot update a component...' React error on occasion. Don't know how
  //   // to fix it. Doesn't seem to be a problem.
  //   changeLanguage(lang);
  // }

  useEffect(() => {
    dropdown.current = options(language, languages);
  }, []);

  return (
    <Menu.Item name="LanguageSelect">
      <Popup
        trigger={
          <Dropdown
            text={language.toUpperCase()}
            style={{ fontSize: '1em' }}
            icon="world"
            item
          >
            <Dropdown.Menu>
              <Dropdown.Header icon="world" content={t('Change Language')} />
              {languages.map((l) => (
                <Dropdown.Item
                  key={l}
                  disabled={l === language}
                  // onClick={languageSelect}
                  lang={l}
                >
                  <Link to={originalPath} language={l}>
                    <Trans>{l}</Trans>
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        }
        content={t('Change Language')}
      />
    </Menu.Item>
  );
};
