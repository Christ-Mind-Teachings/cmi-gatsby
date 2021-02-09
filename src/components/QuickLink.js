import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Popup, Menu, Dropdown } from 'semantic-ui-react';
import { Link, useStaticQuery, graphql } from 'gatsby';

export const QuickLink = (props) => {
  const { icon = true, sourceId } = props;
  const { t } = useI18next();

  const { sourceInfo } = useStaticQuery(graphql`
    query {
      sourceInfo: allCmiSourcesJson {
        nodes {
          title
          url
          sourceId
        }
      }
    }
  `);

  function generateItem(s) {
    if (s.sourceId !== sourceId) {
      return (
        <Dropdown.Item key={s.sourceId} name={s.sourceId}>
          <Link className="ui" to={s.url}>
            {s.title}
          </Link>
        </Dropdown.Item>
      );
    }
  }

  if (icon) {
    return (
      <Menu.Item name="QuickLink">
        <Popup
          trigger={
            <Dropdown icon="book" item>
              <Dropdown.Menu>
                {sourceInfo.nodes.map((s) => generateItem(s))}
              </Dropdown.Menu>
            </Dropdown>
          }
          content={t('Jump to Teaching')}
        />
      </Menu.Item>
    );
  }

  return (
    <Menu.Item name="QuickLink">
      <Menu.Header>Quick Link</Menu.Header>
      <Menu.Menu>
        {sourceInfo.nodes.map((s) => (
          <Menu.Item key={s.sourceId}>
            <Link to={s.url}>{`> ${s.title}`}</Link>
          </Menu.Item>
        ))}
      </Menu.Menu>
    </Menu.Item>
  );
};
