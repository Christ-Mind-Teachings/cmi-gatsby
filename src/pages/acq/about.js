import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { useI18next } from 'gatsby-plugin-react-i18next';
import SEO from '../../components/SEO';
import AcqLayout from '../../components/AcqLayout';
import { AcqAbout } from '../../components/AcqAbout';
import { getNextPrev } from '../../utils/cmiUtils';
import acqContents from '../../data/acq/acqContents.json';
import acqPages from '../../data/acq/acqPages.json';

function getUnit(url) {
  const unitIndex = acqPages.findIndex((i) => i.url === url);

  if (unitIndex === -1) {
    return {};
  }

  return acqPages[unitIndex];
}

export default function About() {
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const { t } = useI18next('about');
  const { pathname } = useLocation();

  useEffect(() => {
    const { next = {}, prev = {} } = getNextPrev(acqPages, '/acq/about');
    setPrev(prev);
    setNext(next);
  }, []);

  return (
    <AcqLayout
      title={t('About the Library')}
      book={acqContents[0]}
      next={next}
      prev={prev}
    >
      <SEO type="acq" data={{ unit: getUnit(pathname) }} />
      <AcqAbout />
    </AcqLayout>
  );
}
