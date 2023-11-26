import PhoneBook from './PhoneBook/PhoneBook';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import SearchFilter from './SearchFilter/SearchFilter';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const storage = localStorage.getItem('contacts');
    if (!storage) {
      this.setState({ contacts: initialContacts });
      return;
    }
    const parsedStorage = JSON.parse(storage);
    this.setState({ contacts: parsedStorage });
  };

  componentDidUpdate = (_, prevState) => {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  };

  handleFilterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleFilter = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const isDuplicateContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isDuplicateContact) {
      alert(`${newContact.name} is already in contacts `);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
      };
    });
  };
  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const filteredContacts = this.handleFilterContacts();
    return (
      <div>
        <Section title={'PhoneBook'}>
          <PhoneBook addContact={this.addContact} />
        </Section>
        <Section title={'Contacts'}>
          <SearchFilter
            filter={this.state.filter}
            handleFilter={this.handleFilter}
          />
          <ContactsList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
