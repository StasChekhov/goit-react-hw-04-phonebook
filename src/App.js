import { useState, useEffect } from 'react'
import s from './components/Phonebook.module.css'

import { v4 as uuidv4 } from 'uuid';
import Section from './components/Section';
import Phonebook from './components/Phonebook';
import ContactList from './components/ContactList';
import Filter from './components/Filter';


export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ??
      [ 
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }, 
      ]
  })
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],

  // filter: '',
  const [filter, setFilter] = useState('');
  

  // componentDidMount() {
    //   // const contacts = localStorage.getItem('contacts')
    
    //   // const parsedContacts = JSON.parse(contacts);
    
    //     this.setState({ contacts: parsedContacts || [] });
    // }
  
    
    useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])
  // componentDidUpdate(PrevProps, PrevState) {
  //   if (this.state.contacts !== PrevState.contacs) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   }
  // }

    
  const onAddContact = (name, number) => {


    if (onCheckContact(name)) {
      alert(`${name} is already in contacts`)
      return
    }
    const obj = { id: uuidv4(), name, number }
    setContacts([...contacts, obj])
    // this.setState((prevState) => ({ contacts: [obj, ...prevState.contacts] }))
    
  }

  const onCheckContact = (value) => {
    return contacts.find (
      (el) => el.name.toUpperCase() === value.toUpperCase(),
    )
  }


  const onDelete = (id) => {
    setContacts(contacts.filter((el, index)=> el.id !== id))
    // this.setState((prevState) => ({
    //   contacts: prevState.contacts.filter((el, index) => el.id !== id),
    // }))

  }
  const visibleContacts = contacts.filter((e) => e.name.toLowerCase().includes(filter.toLowerCase()));
  // contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      <Section title="Phonebook">
        <div className={s.mainDiv}>  
          <Phonebook onAddContact={ onAddContact }/>
        </div>
      </Section>
      <Section title="Contacts">
        <Filter value={ filter } onChange={ setFilter }/>
         <ContactList listContacts={visibleContacts} onDelete={ onDelete }/>
      </Section>
    </div>  
  )
  
}


