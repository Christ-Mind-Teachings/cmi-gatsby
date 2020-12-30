/*
 * Note:
 *
 * We can't use react-toastify here to communicate message to the user because
 * the toast is displayed beneath the dimmer used by the Modal. It can hardly
 * be seen. Instead we format the message prop so a message can be displayed on
 * the quote Modal
 */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import DOMPurify from 'dompurify';
import { Input, TextArea, Dropdown, Form, Message } from 'semantic-ui-react';
import md5 from 'md5';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { getMailList, sendMail } from '../utils/cmiApi';
import { IdentityContext } from './IdentityContextProvider';

/*
 * Format message to wrap pargraphs in <p> tags and
 * sanitize user entered data
 */
function formatMessage(message) {
  let newMessage;

  newMessage = message.replace(/\n/g, '@@');
  newMessage = newMessage.replace(/@@*/g, '@@');

  const mArray = newMessage.split('@@');

  newMessage = mArray.reduce(
    (current, p) => `${current}<p>${DOMPurify.sanitize(p)}</p>`,
    ''
  );

  return newMessage;
}

/**
 * Build object used by the sendMail API
 *
 * @param {object} user - user info
 * @param {string} user.user_metadata.full_name - user name
 * @param {string} user.email - user email
 * @param {object} select - array of names selected from selectList
 * @param {string} select[] - a ':' delimited string email:firstName:lastName
 * @param {string} email - comma delimited list of email addresses
 * @param {string} message - message to recipient of email
 */
function prepareEmail(user, quote, location, selectList, emailList, message) {
  const addresses = [];
  const info = {};
  const shareInfo = {
    senderName: user.user_metadata.full_name,
    senderEmail: user.email,
  };

  if (selectList && selectList.length > 0) {
    selectList.forEach((i) => {
      const [emailAddress, first, last] = i.split(':');
      addresses.push(emailAddress);
      info[emailAddress] = {
        first: first === '' ? 'No First Name' : first,
        last: last === '' ? 'No Last Name' : last,
      };
    });
  }

  if (emailList && emailList.length > 0) {
    const list = emailList.split(',');
    list.forEach((i) => {
      if (i) {
        addresses.push(i);
      }
    });
  }

  shareInfo.to = addresses.join(',');
  shareInfo.variables = JSON.stringify(info);
  shareInfo.citation = `~ ${quote.citation}`;
  shareInfo.quote = quote.quote;
  shareInfo.url = `${location.origin}${quote.url}`;

  if (message) {
    shareInfo.message = formatMessage(message);
  }

  return shareInfo;
}

/**
 * This is the Share by email form. We send a Ref to the users email list via props
 * so we don't have to query it each time the component is rendered which may be
 * several times in the life of the page.
 *
 * @param {object} props
 * @param {Ref} props.mailList - users list of email addresses, initially null
 * @param {boolean} props.send - when true, user pushed 'send email' button
 * @param {function} props.setSend - after procesing send, we reset it to false
 * @param {object} quote - the quote to send
 * @param {string} quote.quote - the actual quote
 * @param {string} quote.citation - where the quote is found
 * @param {string} quote.url - url to page and paragraph of the quote
 * @param {object} source.sourceId - The id of the source (wom, raj, etc)
 * @param {function} setOpen - used to close this Modal
 * @param {object} message - used to display a message on the calling Modal
 * @param {object} message.message - {msg, hidden, color}
 * @param {function} message.setMessage - set the message
 */
export default function EmailShare(props) {
  const { message, setOpen, source, quote, mailList, send, setSend } = props;

  const [sendingEmail, setSendingEmail] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [emailList, setEmailList] = useState();
  const [selectList, setSelectList] = useState();
  const [emailMessage, setEmailMessage] = useState();
  const [fieldError, setFieldError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const { user } = useContext(IdentityContext);
  const location = useLocation();
  const { t } = useI18next(['quotes']);

  // persist input data for email addresses and email message
  const handleChange = (e, { name, value }) => {
    if (name === 'emailList') {
      if (fieldError !== false) {
        setFieldError(false);
      }
      if (selectError !== false) {
        setSelectError(false);
      }
      setEmailList(value);
    } else if (name === 'emailMessage') {
      setEmailMessage(value);
    }
  };

  // persist selection from email select list
  const selectChange = (e, { value }) => {
    if (selectError !== false) {
      setSelectError(false);
    }
    if (fieldError !== false) {
      setFieldError(false);
    }
    setSelectList(value);
  };

  // query user email list and format to address:firstName:lastName
  useEffect(() => {
    async function getUserEmailList() {
      try {
        const list = await getMailList(md5(user.email));

        const formattedList = list.map((i, index) => ({
          key: `${i.first ? i.first.charAt(0) : '?'}${
            i.last ? i.last.charAt(0) : '?'
          }-${index}`,
          value: `${i.address}:${i.first}:${i.last}`,
          text: `${i.first} ${i.last}`,
        }));

        if (formattedList.length > 0) {
          mailList.current = formattedList;
          setShowSelect(true);
        }
      } catch (error) {
        // TODO: inform user of error
        console.error(error);
      }
    }

    // if mailList is null we haven't fetched it yet, if it's an empty array
    // the user has no mailList so we don't show the select
    if (!mailList.current) {
      getUserEmailList();
    } else if (mailList.current.length > 0) {
      setShowSelect(true);
    }
  }, []);

  // validate form and call send mail
  useEffect(() => {
    if (!send) return;

    // validate form: emailList and/or selectList must have a value
    // if selectList is null user doesn't have an email list
    if (!mailList.current && !emailList) {
      setFieldError(t('Enter at least one email address'));
      setSend(false);
      return;
    }
    if (mailList.current && mailList.current.length === 0 && !emailList) {
      setFieldError(t('Enter at least one email address'));
      setSend(false);
      return;
    }
    if (!selectList && !emailList) {
      setFieldError(
        t('Enter an email address or select one from the list above.')
      );
      setSelectError(t('Select an address or enter one in the field below.'));
      setSend(false);
      return;
    }

    // call sendMail
    async function sendQuote() {
      const options = prepareEmail(
        user,
        quote,
        location,
        selectList,
        emailList,
        emailMessage
      );
      options.sid = source.sourceId;

      try {
        setSendingEmail(true);
        const result = await sendMail(options);
        if (!result.ok) {
          message.setMessage({
            ...message.message,
            msg: t('Email send failed!'),
            color: 'red',
            hidden: false,
          });
          console.warn('send failed: %s', result.message);
        } else {
          message.setMessage({
            ...message.message,
            msg: t('Email sent!'),
            color: 'teal',
            hidden: false,
          });
        }
      } catch (error) {
        // TODO: notify user of error
        console.error(error);
      } finally {
        // stop form loading indicator
        setSendingEmail(false);

        // close email share dialog
        setOpen(false);
      }
    }

    // gather info and send mail
    sendQuote();

    // reset Send Mail button
    setSend(false);
  }, [send]);

  return (
    <Form loading={sendingEmail}>
      {showSelect && (
        <Form.Field
          label={t('Select from your email list')}
          control={Dropdown}
          placeholder={t('Select one or more')}
          multiple
          search
          selection
          error={selectError}
          options={mailList.current}
          onChange={selectChange}
        />
      )}
      {!showSelect && (
        <Message positive>
          <Message.Header>{t('Create your own email list.')}</Message.Header>
          {/* TODO: add link */}
          <p>{t('createEmailList')}</p>
        </Message>
      )}
      <Form.Field
        error={fieldError}
        name="emailList"
        value={emailList || ''}
        required={!showSelect}
        label={t('Enter Email Address(es)')}
        type="email"
        placeholder={t('Comma separated list')}
        control={Input}
        onChange={handleChange}
      />
      <Form.Field
        name="emailMessage"
        value={emailMessage || ''}
        label={t('Add a message')}
        placeholder={t('Your message (optional)')}
        control={TextArea}
        onChange={handleChange}
      />
    </Form>
  );
}
