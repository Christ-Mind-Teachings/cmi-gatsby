import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';

function en() {
  return (
    <>
      <p>
        Welcome to the Library of Christ Mind Teachings. My name is Rick Mercer.
      </p>
      <p>
        My journey began with <em>A Course In Miracles</em> and followed on to
        <em>The Way of Mastery</em>, <em>The Raj Material</em> and, most
        recently, <em>A Course of Love</em>. I hear the same voice in all of
        them saying the same thing in somewhat different ways. There is profound
        wisdom here that is clearly not of this world.
      </p>
      <p>
        The Library makes this material easily accessible to everyone and
        integrates the various pieces. The <em>Search</em> feature supports
        discovery and
        <em>Bookmarks and Annotations</em> allow for easy lookup and sharing.
      </p>
      <p>
        I hope you enjoy using and discovering the wisdom in these pages and
        allow it to transform your life.
      </p>
      <p>
        I would love to hear from you about any subject. You can especially
        support this project by reporting any errors you find and by suggesting
        new features and the addition of other teachings. Thank you!
      </p>
    </>
  );
}

function pl() {
  return (
    <>
      <p>Witamy w Bibliotece Christ Mind Teachings. Nazywam się Rick Mercer.</p>
      <p>
        Moja podróż zaczęła się od <em> Kursu cudów </em> i trwała dalej
        <em> Droga mistrzostwa </em>, <em> materiał Raj </em> i większość
        ostatnio <em> Kurs miłości </em>. Słyszę ten sam głos we wszystkich
        mówią to samo w nieco inny sposób. Jest głęboka mądrość tutaj, która
        wyraźnie nie jest z tego świata.
      </p>
      <p>
        Biblioteka sprawia, że ​​ten materiał jest łatwo dostępny dla każdego i
        integruje różne elementy. Funkcja <em> Szukaj </em> obsługuje odkrycie i
        <em> Zakładki i adnotacje </em> umożliwiają łatwe wyszukiwanie i
        udostępnianie.
      </p>
      <p>
        Mam nadzieję, że spodoba ci się używanie i odkrywanie mądrości na tych
        stronach i pozwól, by zmieniło twoje życie.
      </p>
      <p>
        Bardzo chciałbym usłyszeć od Ciebie na każdy temat. Szczególnie możesz
        wesprzyj ten projekt, zgłaszając wszelkie znalezione błędy i sugerując
        nowe funkcje i dodanie innych nauk. Dziękuję Ci!
      </p>
    </>
  );
}

export function AcqContactIntro() {
  const { language } = useI18next();

  switch (language) {
    case 'en':
      return en();
    case 'pl':
      return pl();
    default:
      return <p>{`Unknown language ${language}`}</p>;
  }
}
