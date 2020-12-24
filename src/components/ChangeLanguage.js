import React, { useRef, useEffect } from 'react';
import { Link, useI18next, Trans } from 'gatsby-plugin-react-i18next';
import { Menu, Dropdown } from 'semantic-ui-react';

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
  const { originalPath, changeLanguage, language, languages, t } = useI18next();
  const dropdown = useRef();

  function languageSelect(e, { lang }) {
    // this causes a 'Cannot update a component...' React error on occasion. Don't know how
    // to fix it. Doesn't seem to be a problem.
    changeLanguage(lang);
  }

  useEffect(() => {
    dropdown.current = options(language, languages);
  }, []);

  return (
    <Menu.Item name="LanguageSelect">
      <Dropdown text={language.toUpperCase()} icon="world" simple item>
        <Dropdown.Menu>
          <Dropdown.Header icon="world" content={t('Change Language')} />
          {languages.map((l) => (
            <Dropdown.Item
              key={l}
              disabled={l === language}
              onClick={languageSelect}
              lang={l}
            >
              <Trans>{l}</Trans>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
