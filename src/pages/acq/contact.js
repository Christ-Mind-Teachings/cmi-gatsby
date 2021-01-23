import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default function ContactPage(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  function submitHandler(e) {
    e.preventDefault();
    console.log('onSubmit: %o', formData);

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encode({ 'form-name': 'acq-contact-form', ...formData }),
    })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  function handleChange(e, { name, value }) {
    console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  }

  return (
    <Form
      name="acq-contact-form"
      netlify-honeypot="sneaky-piet"
      onSubmit={submitHandler}
      netlify-data="true"
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
  );
}
