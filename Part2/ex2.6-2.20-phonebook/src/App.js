import { useEffect, useState } from 'react'
import services from './services/rest_service'
import './app.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")
  const [toast, setToast] = useState("")


  useEffect(() => {
    const timeout = setTimeout(() => {
    setToast("")
    }, 5000)
    return () => {
      //This gets executed right when there is another scheduled useEffect render ... 
      //I understand what it does, what i don't understand is, why useEffect's return function breaks
      //the entire philosophy of functional programming by not 
      clearTimeout(timeout)
    }
  },[toast])


  const fetchData = ()=>{
  services.getALL("http://localhost:3001/persons")
    .then((response) => {
      setPersons(response)
    })
  }
  useEffect(fetchData, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <form>
          <AddName newName={newName} setNewName={setNewName} />
          <AddNumber newNumber={newNumber} setNewNumber={setNewNumber}/>
        <AddButton persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber} setToast={setToast} />
        </form>
        <br />
      <Toast toast={toast} />

      <h2>Numbers</h2>
        <Finder newSearch={newSearch} setNewSearch={setNewSearch}/>
      <ContactList newSearch={newSearch} persons={persons}
        setPersons={setPersons} setToast={setToast} />
    </div>
  )
}


const ContactList = (props) => {
  return (
      <ul>
        {props.newSearch.length > 0 ?
          props.persons.filter((person) => person.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(
            (person) => <li key={person.id}> {person.name} | {person.number}
              <DeletePerson persons={props.persons} setPersons={props.setPersons}
              id={person.id} setToast={props.setToast} /></li>
          )
          :
        props.persons.map((person) => 
          <li key={person.id}> {person.name} | {person.number}
            <DeletePerson persons={props.persons} setPersons={props.setPersons}
              id={person.id} setToast={props.setToast} /></li>
         )}
      </ul>
  )
}


const AddName = (props) => {
  return (
    <div>
      Name : <input value={props.newName}
        onChange={(event) => props.setNewName(event.target.value)} />
    </div>
  )
}


const AddNumber = (props) => {
  return (
    <div>
      Number : <input value={props.newNumber}
        onChange={(event) => props.setNewNumber(event.target.value)} />
    </div>
  )
}

const AddButton = (props) => {
    const btnAction = (event) => {
      event.preventDefault()
      const alreadyExisting = props.persons.find((person) => person.name.toLowerCase() === props.newName.toLowerCase())
      if (alreadyExisting) {

        if (window.confirm(`${props.newName} already exists in PhoneBook, Update Number ?`)) {
          const updatedPerson = { ...alreadyExisting, number: props.newNumber }
          services.update("http://localhost:3001/persons", alreadyExisting.id, updatedPerson)
            .then((response) => 
            {
              props.setPersons(props.persons.map((person) => person.id === response.id ? response : person))
              props.setToast({msg : `${props.newName} has been updated`, state : "green"})
              
          })
        }
        props.setNewName("")
        props.setNewNumber("")
        return
      }

      const newPerson = {name : props.newName, number : props.newNumber}
      services.create("http://localhost:3001/persons", newPerson)
        .then((response) => {
          props.setPersons(props.persons.concat(response))
          props.setToast({msg : `${props.newName} has been added`, state : "green"})
          props.setNewName("")
          props.setNewNumber("")
        }
      )
  }
  return (
    <div>
      <button onClick={btnAction} type="submit">add</button>
    </div>
  )
}


const DeletePerson = (props) => {
  return (
    <button onClick={() => {
        const personToDelete = props.persons.find((person) => person.id === props.id).name
        if(window.confirm(`Delete ${personToDelete} ?`))
          services.remove("http://localhost:3001/persons", props.id)
            .then(() => {
              props.setPersons(props.persons.filter((person) => person.id !== props.id))
              console.log(personToDelete)
              props.setToast({ msg: `${personToDelete} has been deleted`, state: "green" })

            }).catch(() => {
              props.setToast({ msg: `Error, ${personToDelete} is already deleted from database, updating...`, state: "red" })
              props.setPersons(props.persons.filter((person) => person.id !== props.id))

            })
      }
    }>delete</button>
  )
}


const Finder = (props) => {
  return (
    <>
    Find <input type="text" value={props.newSearch} onChange={
        (event) => {
          props.setNewSearch(event.target.value)
        }
      } />
    </>
  )
}

function clearToast (timeout, setToast) {
  clearTimeout(timeout)
  console.log("timeout", timeout)
  timeout = () => setTimeout(() => {
    console.log()
    setToast("")
  }, 5000)
}


const Toast = (props) => {
  const message = props.toast.msg
  const isPositive = props.toast.state
  if (props === "") {
    return null
  }
  if (isPositive==="green") {
    return (
      <div className='toastGreen'>
        {message}
      </div>
    )
  }
  if(isPositive==="red") {
    return (
      <div className='toastRED'>
        {message}
      </div>
    )
  }
}


export default App