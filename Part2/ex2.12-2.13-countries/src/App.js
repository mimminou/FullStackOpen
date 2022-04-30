import axios from "axios"
import { useState, useEffect } from "react"


const App = () => {
  const [countries, setCountries] = useState()
  const [query, newQuery] = useState("")
  const [IsCountryShown, setIsCountryShown] = useState({shown : false, country : ""})

  useEffect(() => {
      axios.get("https://restcountries.com/v3.1/all")
        .then((response) => {
          setCountries(response.data)
    })
  },[])

  if (countries !== undefined) {
    return (
      <>
        Find a country : <input type="text" value={query} onChange={(event) => {
          newQuery(event.target.value)
          setIsCountryShown({shown : false, country: ""})
        }}
          onFocus={() => {
          setIsCountryShown({shown : false, country: ""})
          }}
        />
        <CountryList countries={countries} query={query} IsCountryShown={IsCountryShown} setIsCountryShown={setIsCountryShown}/>
      </>
    )
  }
}


const CountryList = (props) => {
  const filtered = props.countries.filter((country) => {
      return country.name.common.toLowerCase().includes(props.query.toLowerCase())
    }
  )

  if (props.query.length === 0) {
    return (
      <>
      </>
    )
  }

  if (filtered.length < 10) {
    if (props.IsCountryShown.shown) {
      return (
        <CountryComponent data={props.IsCountryShown.country}/>
      )
    }
    return (
      <div>
        { 
          filtered.map((country) => {
          return (
            <li key={country.name.common}>{country.name.common} {<ShowView country={country} setIsCountryShown={props.setIsCountryShown} IsCountryShown={props.IsCountryShown}/>}</li>
          )
          })
        }
      </div>
    )
  }
  else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}



const ShowView = (props) => {
  return (
    <button onClick={() => {
      props.setIsCountryShown({ shown: true, country: props.country })
    }
    }>Show</button>
  )
}


const CountryComponent = (props) => {
  const data = props.data
  return (
    <div>
      <h1>{data.name.common}</h1>
      <h3> Capital : {data.capital[0]}</h3>
      <h3> Area : {data.area} KM²</h3>
      <h3> Languages : </h3>
      <ul>
        {Object.values(data.languages).map((lang) => {
          return(
            <li key={lang}>{lang}</li>
          )
        })}
      </ul>
      <img style={{border:"solid black 1px"}} src={data.flags.png} alt="flag"/>
    </div>
  )
}

export default App;
