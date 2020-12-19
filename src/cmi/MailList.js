/* eslint-disable no-nested-ternary */
import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Container,
  Ref,
  Table,
  Button,
  Header,
  Grid,
  Form,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import md5 from 'md5';
import styled from 'styled-components';
import { Dashboard } from '../components/Dashboard';
import { putMailList, getMailList } from '../utils/cmiApi';
import { IdentityContext } from '../components/IdentityContextProvider';

const StyledForm = styled(Form)`
  .field.hidden {
    display: none;
  }
`;

const StyledTable = styled(Table)`
  tr.deleted-item {
    color: #f58f8f;
    text-decoration: line-through;
    font-style: italic;
    font-weight: bold;
  }

  tr.new-item {
    color: green;
    font-style: italic;
    font-weight: bold;
  }

  tr.updated-item {
    color: #6849f3;
    font-style: italic;
    font-weight: bold;
  }
`;

export function MailList(props) {
  const formRef = useRef();
  const { user } = useContext(IdentityContext);
  const [mailList, setMailList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('Add');
  const [dataChanged, setDataChanged] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [formData, setFormData] = useState({
    index: -1,
    first: '',
    last: '',
    address: '',
  });

  function cancelEdit() {
    setFormData({
      index: -1,
      first: '',
      last: '',
      address: '',
    });
    formRef.current.focus();
    setAction('Add');
  }

  function addOrEditItem(e) {
    e.preventDefault();
    const { first, last, address } = formData;
    if (formData.index === -1) {
      // add new item
      setMailList([{ first, last, address, status: 'new' }, ...mailList]);
    } else {
      // update existing item
      const { status } = mailList[formData.index];

      if (status !== 'new') {
        mailList[formData.index] = { first, last, address, status: 'updated' };
      } else {
        mailList[formData.index] = { first, last, address, status };
      }
      setMailList([...mailList]);
    }
    // clear form after submit
    cancelEdit();
    setAction('Add');
    setDataChanged(true);
  }

  function onChangeHandler(e) {
    const fieldName = e.target.getAttribute('name');
    setFormData({ ...formData, [fieldName]: e.target.value });
  }

  function rowClickHandler(e, data) {
    const rowIndex = data.index;
    const item = mailList[rowIndex];
    if (data.name === 'delete') {
      if (item.status === 'deleted') {
        item.status = item.prevStatus;
      } else {
        item.prevStatus = item.status;
        item.status = 'deleted';
      }
      setMailList([...mailList]);
      setDataChanged(true);
      return;
    }
    if (data.name === 'edit') {
      setFormData({
        first: item.first,
        last: item.last,
        address: item.address,
        index: rowIndex,
      });
      formRef.current.focus();
      setAction('Update');
    }
  }

  useEffect(() => {
    if (!saveChanges) return;

    async function saveMailList(newList) {
      try {
        setLoading(true);
        const response = await putMailList(md5(user.email), newList);

        if (response.ok) {
          setMailList(newList);
          setDataChanged(false);
          toast('Email list updated!');
        }
      } catch (error) {
        toast.error(`Failed to update email list: ${error}`);
        console.error(error);
      } finally {
        // stop loading
        setLoading(false);
        setSaveChanges(false);
        formRef.current.focus();
      }
    }

    // format mailList to remove status and deleted items
    const modifiedMailList = mailList
      .filter((i) => i.status !== 'deleted')
      .map((e) => {
        e.status = 'current';
        return e;
      });

    // call API to persist
    saveMailList(modifiedMailList);
  }, [saveChanges]);

  useEffect(() => {
    async function getUserEmailList() {
      try {
        setLoading(true);
        const list = await getMailList(md5(user.email));
        const modifiedList = list.map((i) => {
          i.status = 'current';
          return i;
        });
        setMailList(modifiedList);
      } catch (error) {
        toast.error('Failed to download email list.');
        console.error(error);
      } finally {
        setLoading(false);
        formRef.current.focus();
      }
    }

    getUserEmailList();
  }, []);

  return (
    <Dashboard activeItem="maillist">
      <Grid.Row>
        <Container text>
          <Header dividing size="huge" as="h1">
            Manage your email list
          </Header>
          <p>
            Create a list of email addresses that you can select from when
            sharing quotes by email. This way you don't have to remember your
            friends email addresses and makes sharing easier.
          </p>
          <StyledForm loading={loading} onSubmit={addOrEditItem}>
            <Form.Group widths="equal">
              <Form.Input
                onChange={onChangeHandler}
                value={formData.index || 0}
                className="hidden"
              />
              <Form.Field>
                <label htmlFor="first-name">First Name</label>
                <Ref innerRef={formRef}>
                  <input
                    required
                    name="first"
                    placeholder="First Name"
                    value={formData.first}
                    id="first-name"
                    onChange={onChangeHandler}
                  />
                </Ref>
              </Form.Field>
              <Form.Input
                name="last"
                label="Last Name"
                value={formData.last}
                placeholder="Last name"
                id="Last-name"
                onChange={onChangeHandler}
              />
              <Form.Input
                required
                name="address"
                label="Email Address"
                value={formData.address}
                placeholder="Email Address"
                id="email"
                type="email"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Button.Group floated="left">
              <Button positive type="submit">
                {action}
              </Button>
              <Button.Or />
              <Button onClick={cancelEdit} type="button">
                Cancel
              </Button>
            </Button.Group>
            <Button.Group floated="right">
              <Button
                disabled={!dataChanged}
                color="yellow"
                onClick={() => setSaveChanges(true)}
                type="button"
              >
                Save Changes
              </Button>
            </Button.Group>
          </StyledForm>
          <StyledTable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Email Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mailList.map((i, index) => (
                <Table.Row
                  key={index}
                  className={
                    i.status === 'deleted'
                      ? 'deleted-item'
                      : i.status === 'new'
                      ? 'new-item'
                      : i.status === 'updated'
                      ? 'updated-item'
                      : null
                  }
                >
                  <Table.Cell>
                    <Button
                      name="delete"
                      index={index}
                      onClick={rowClickHandler}
                      icon={i.status === 'deleted' ? 'refresh' : 'trash'}
                      color={i.status === 'deleted' ? 'red' : null}
                    />
                    {/* <Icon name={i.deleted ? 'refresh' : 'trash'} /> */}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      disabled={i.status === 'deleted'}
                      name="edit"
                      index={index}
                      onClick={rowClickHandler}
                      icon="pencil"
                    />
                    {/* <Icon name="pencil" /> */}
                  </Table.Cell>
                  <Table.Cell>{i.first}</Table.Cell>
                  <Table.Cell>{i.last}</Table.Cell>
                  <Table.Cell>{i.address}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </StyledTable>
        </Container>
      </Grid.Row>
    </Dashboard>
  );
}
