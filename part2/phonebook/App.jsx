import { useState, useEffect } from 'react'
import phonebookService from './services/servercoms'

const Person = ({ name, number }) => {
    console.log("Parsed to Person:", name, number)
    return <p>{name} {number}</p>
}

const Filter = ({ value, onChange }) => <div>Filter shown with: <input value={value} onChange={onChange} /></div>

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <p>Name: <input value={newName} onChange={handleNameChange} /></p>
            </div>
            <div>
                <p>Number: <input value={newNumber} onChange={handleNumberChange} /></p>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, newFilter, deleteEntry }) => {
    const personsToShow = newFilter === ""
        ? persons
        : persons.filter(persons => persons.name.toUpperCase().includes(newFilter.toUpperCase()))
    return personsToShow.map(person =>
        <div key={person.name}>
            <Person name={person.name} number={person.number} />
            <button onClick={() => deleteEntry(person.id, person.name)}>Delete</button>
        </div>
    )
}

const Notification = ({ message, messageColor }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification" style={{ color: messageColor }}>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notificationMessage, setNotificationMeassage] = useState(null)
    const [messageColor, setMessageColor] = useState("green")

    useEffect(() => {
        phonebookService
            .getAll()
            .then(response => {
                console.log("Initial phonebook loaded")
                setPersons(response)
            })
            .catch(error => {
                console.log("An error occured while initializing phonebook entries:", error)
                setMessageColor("red")
                showMessage("Error: Could not initialize phonebook!")
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        console.log("button clicked", event.target)
        console.log("Check for double names")
        const isDoubleName = persons.some(person => person.name.toUpperCase() === newName.toUpperCase())
        if (isDoubleName) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updatePerson(newName, newNumber)
                setMessageColor("green")
                showMessage(`Added ${newName} to the phonebook`)
                
            }
        } else {
            createPerson(newName, newNumber)
            setMessageColor("green")
            showMessage(`Added ${newName} to the phonebook`)

        } 
    }

    const updatePerson = (newName, newNumber) => {
        const id = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())?.id
        console.log(`Found ${newName}s ID: ${id}`)
        const personsObject = {
            name: newName,
            number: newNumber
        }
        phonebookService
            .update(id, personsObject)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id === id ? returnedPerson : person))
                setNewNumber("")
                setNewName("")
            })
            .catch(error => {
                console.log(`An error occured updating ${newName}s phone number:`, error)
                setMessageColor("red");
                if (error.response.status === 404) {
                    showMessage(`${newName} has already been deleted from the server!`);
                } else {
                    showMessage(`An error occured while updating ${newName}s phone number!`) 
                }
            })
    }

    const createPerson = (newName, newNumber) => {
        const personsObject = {
            name: newName,
            number: newNumber
        }
        console.log("personsObject:", personsObject)
        phonebookService
            .create(personsObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewNumber("")
                setNewName("")
            })
            .catch(error => {
                console.log(`An error occured adding ${newName} to the phonebook: ${error}`)
                setMessageColor("red")
                showMessage(`An error occured while adding ${newName} to the phonebook!`)
            })
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const handleSearchFieldChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    const deleteEntry = (id, name) => {
        console.log(`Entry ${name} with id ${id} is set to be deleted`)
        if (window.confirm(`Delete ${name}?`)) {
            phonebookService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    console.log(`Entry id ${id} was successfully deleted`)
                    setMessageColor("green")
                    showMessage(`Removed ${name} from the phonebook`)
                })
                .catch(error => {
                    console.error(`An error occured while deleting ${name}:`, error)
                    setMessageColor("red")
                    showMessage(`An error occured while deleting ${name}!`)
                })
        }
    }

    const showMessage = (message) => {
        setNotificationMeassage(message)
        setTimeout(() => {
            setNotificationMeassage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} messageColor={messageColor} />
            <Filter value={newFilter} onChange={handleSearchFieldChange} />
            <h2>Add New Entry</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson} />
            <h2>Numbers</h2>
            <Persons persons={persons} newFilter={newFilter} deleteEntry={deleteEntry} />
        </div>
        
    )
}

export default App
