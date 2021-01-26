import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';

function en() {
  return (
    <>
      <p>
        This library of Christ Mind teachings is offered to you from a deep
        appreciation and love of the content contained herein and for the love
        expressed and demonstrated in the words of each teaching. Within these
        words is found the motivation and power for real and lasting
        transformation of the human condition through love. Approached with
        honesty, curiosity, patience and a genuine desire for change the
        materials presented here will serve as a trusted guide and friend on the
        journey of awakening.
      </p>
      <p>
        One of the goals of this site is to bring all the bits and pieces of a
        teaching together in an easily discoverable and usable format. This is
        particularly true for <em>The Way of Mastery</em> and
        <em>The Raj Material</em> which, because of the volume of content, was
        difficult to compile into an approachable package.
      </p>
      <p>
        Another goal is to integrate audio, where present, with the written word
        so you can read along as you listen and not lose your place. See the{' '}
        <em>Get Acquainted</em> guide for details of this and other features of
        the library.
      </p>
      <p>
        The intent of the library is to offer simple, readable, and uncluttered
        access to the material herein. The interface is terse by design so be
        sure to poke around and get familiar with the features available. Start
        by clicking the <i className="question icon" />
        option in the menu bar of each page. Video documentation is also
        available.
      </p>
    </>
  );
}

function pl() {
  return (
    <>
      <p>
        Ta biblioteka nauk umysłu Chrystusa jest wam oferowana z głębokiego
        uznania i miłości do treści tutaj zawartych oraz z miłości wyrażonej i
        okazywanej w słowach każdej nauki. W tych słowach znajduje się motywacja
        i moc do rzeczywistej i trwałej przemiany kondycji ludzkiej poprzez
        miłość. Podchodząc z uczciwością, ciekawością, cierpliwością i prawdziwą
        chęcią zmiany, przedstawione tutaj materiały posłużą jako zaufany
        przewodnik i przyjaciel na drodze przebudzenia.
      </p>
      <p>
        Jednym z celów tej witryny jest zebranie wszystkich fragmentów nauczania
        w łatwym do odnalezienia i użytecznym formacie. Jest to szczególnie
        prawdziwe w przypadku <em>The Way of Mastery</em> i{' '}
        <em>The Raj Material</em>, które ze względu na objętość zawartości były
        trudne do skompilowania w przystępny pakiet.
      </p>
      <p>
        Innym celem jest zintegrowanie dźwięku, jeśli jest obecny, ze słowem
        pisanym, abyś mógł czytać podczas słuchania i nie tracić miejsca. Zobacz
        przewodnik <em>Zapoznanie się</em>, aby uzyskać szczegółowe informacje
        na temat tej i innych funkcji biblioteki.
      </p>
      <p>
        Celem biblioteki jest zapewnienie prostego, czytelnego i niezakłóconego
        dostępu do zawartych w niej materiałów. Interfejs jest zwięzły, więc nie
        zapomnij go przejrzeć i zapoznać się z dostępnymi funkcjami. Zacznij od
        kliknięcia opcji <i className="ikona pytania" /> na pasku menu każdej
        strony. Dostępna jest również dokumentacja wideo.
      </p>
    </>
  );
}

export function IndexIntro() {
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
