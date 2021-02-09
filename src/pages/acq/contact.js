import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { Image, Header, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useI18next } from 'gatsby-plugin-react-i18next';
import SEO from '../../components/SEO';
import AcqLayout from '../../components/AcqLayout';
import { getNextPrev } from '../../utils/cmiUtils';
import acqContents from '../../data/acq/acqContents.json';
import acqPages from '../../data/acq/acqPages.json';
import { IdentityContext } from '../../components/IdentityContextProvider';
import { AcqContactIntro } from '../../components/AcqContactIntro';
import rick from '../../assets/images/cmi/rick-profile.jpg';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function getUnit(url) {
  const unitIndex = acqPages.findIndex((i) => i.url === url);

  if (unitIndex === -1) {
    return {};
  }

  return acqPages[unitIndex];
}

export default function ContactPage() {
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const { user } = useContext(IdentityContext);
  const [formData, setFormData] = useState({
    name: user ? user.user_metadata.full_name : '',
    email: user ? user.email : '',
    message: '',
  });
  const { t } = useI18next('contact');
  const { pathname } = useLocation();

  useEffect(() => {
    const { next = {}, prev = {} } = getNextPrev(acqPages, '/acq/contact');
    setPrev(prev);
    setNext(next);
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const body = encode({ 'form-name': 'acq-contact-form', ...formData });

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(() => {
        toast(t('Thanks! You have made contact.'));
        setFormData({
          name: user ? user.user_metadata.full_name : '',
          email: user ? user.email : '',
          message: '',
        });
      })
      .catch((err) => {
        console.error(err);
        toast(t('Sorry, There was an error sending the message'));
      });
  }

  function handleChange(e, { name, value }) {
    setFormData({ ...formData, [name]: value });
  }

  return (
    <AcqLayout
      title={t('Get In Touch')}
      book={acqContents[0]}
      next={next}
      prev={prev}
    >
      <SEO type="acq" data={{ unit: getUnit(pathname) }} />
      <Image src={rick} size="medium" floated="left" rounded />
      <AcqContactIntro />
      <hr />
      <Header as="h2">{t('Send me a message')}</Header>
      <Form
        action="/acq/contact"
        name="acq-contact-form"
        netlify-honeypot="sneaky-piet"
        onSubmit={submitHandler}
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="acq-contact-form" />
        <input type="hidden" name="sneaky-piet" value="acq-contact-form" />
        <Form.Field>
          <Form.Input
            required
            label={t('Name')}
            value={formData.name}
            name="name"
            type="text"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            required
            label={t('Email Address')}
            value={formData.email}
            name="email"
            type="email"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            required
            label={t('Message')}
            onChange={handleChange}
            value={formData.message}
            name="message"
            type="text"
            rows="5"
            placeholder={t('Your message')}
          />
        </Form.Field>
        <Form.Button content={t('Submit')} />
      </Form>
    </AcqLayout>
  );
}
