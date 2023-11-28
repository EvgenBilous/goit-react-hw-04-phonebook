import { React, useState } from 'react';

const PhoneBook = ({ onSubmit }) => {
  const [state, setState] = useState({ name: '', number: '' });

  const handleChangeInputsForm = event => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(state);
    setState({ name: '', number: '' });
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          onChange={handleChangeInputsForm}
          type="text"
          name="name"
          minLength={2}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          value={name}
        />
      </label>
      <label>
        Number
        <input
          onChange={handleChangeInputsForm}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default PhoneBook;
