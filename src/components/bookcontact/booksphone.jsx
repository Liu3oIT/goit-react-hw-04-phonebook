import React, { useEffect, useState } from 'react';
import { Form } from 'components/FormForContact/form';
import css from './booksphone.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BookPhones = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const LocalStorage = JSON.parse(window.localStorage.getItem('bookContacts'));
  const [contacts, setContacts] = useState(() => {
    return LocalStorage ?? initialContacts;
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('bookContacts', JSON.stringify(contacts));
  }, [contacts]);
  const FormSubmit = data => {
    console.log(data);
    const existingContact = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existingContact) {
      toast.error('Already Added.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setContacts(prevState => [...prevState, data]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleFindContact = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <h1 className={css.title}>Phonebook</h1>
      <Form onSubmit={FormSubmit} />
      <div className={css.container}>
        <h2 className={css.title_contact}>Contacts</h2>

        <label className={css.find_contact} htmlFor="">
          Find contacts by name
          <input
            className={css.input_find}
            type="text"
            name="filter"
            value={filter}
            onChange={handleFindContact}
          />
        </label>

        <ul>
          {getFilteredContacts().map(contact => (
            <li className={css.list_contact} key={contact.id}>
              <p className={css.info_contact}>{contact.name}</p>
              <p className={css.info_contact}>{contact.number}</p>
              <button
                className={css.button_delet_contact}
                type="button"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookPhones;
