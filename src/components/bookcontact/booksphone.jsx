import React from 'react';
import Form from 'components/FormForContact/form';
import css from './booksphone.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class BookPhones extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState)
      localStorage.setItem('bookContacts', JSON.stringify(this.state.contacts));
  }
  componentDidMount() {
    const list = localStorage.getItem('bookContacts');
    const parsedList = JSON.parse(list);
    if (parsedList) {
      this.setState({ contacts: parsedList });
    }
  }
  FormSubmit = data => {
    const existingContact = this.state.contacts.find(
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
      return 
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    
  };

  handleFindContact = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <h1 className={css.title}>Phonebook</h1>
        <Form onSubmit={this.FormSubmit} />
        <div className={css.container}>
          <h2 className={css.title_contact}>Contacts</h2>

          <label className={css.find_contact} htmlFor="">
            Find contacts by name
            <input
              className={css.input_find}
              type="text"
              name="filter"
              value={this.state.filter}
              onChange={this.handleFindContact}
            />
          </label>

          <ul>
            {filteredContacts.map(contact => (
              <li className={css.list_contact} key={contact.id}>
                <p className={css.info_contact}>{contact.name}</p>
                <p className={css.info_contact}>{contact.number}</p>
                <button
                  className={css.button_delet_contact}
                  type="button"
                  onClick={() => this.deleteContact(contact.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default BookPhones;
