import React, { useContext, useEffect, useState } from 'react';
import { Image, Header, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import AcqLayout from '../../components/AcqLayout';
import { getNextPrev } from '../../utils/cmiUtils';
import acqContents from '../../data/acq/acqContents.json';
import acqPages from '../../data/acq/acqPages.json';
import { IdentityContext } from '../../components/IdentityContextProvider';
import rick from '../../assets/images/cmi/rick-profile.jpg';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
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
  console.log('user: %o', user);

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
        toast('Thanks! You have made contact.');
        setFormData({
          name: user ? user.user_metadata.full_name : '',
          email: user ? user.email : '',
          message: '',
        });
      })
      .catch((err) => {
        console.error(err);
        toast('Sorry, there was an error');
      });
  }

  function handleChange(e, { name, value }) {
    console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  }

  return (
    <AcqLayout
      title="Get In Touch"
      book={acqContents[0]}
      next={next}
      prev={prev}
    >
      <Image src={rick} size="medium" floated="left" rounded />
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

      <hr />
      <Header as="h2">Send me a message.</Header>
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
            label="Name"
            value={formData.name}
            name="name"
            type="text"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            required
            label="Email Address"
            value={formData.email}
            name="email"
            type="email"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            required
            label="Message"
            onChange={handleChange}
            value={formData.message}
            name="message"
            type="text"
            rows="5"
            placeholder="Your message"
          />
        </Form.Field>
        <Form.Button content="Submit" />
      </Form>
    </AcqLayout>
  );
}
