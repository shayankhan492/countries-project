
import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([])

  // const [filteredData, setQuery] = useFilter(data, () => '')

  useEffect(() => {
     fetch("https://countries.dev/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)
      })
  }, [])

  if (!countriesData.length) {
    return <CountriesListShimmer />
  }

  return (
    <>
      <div className="countries-containers">
        {countriesData
          .filter((country) => country.name.toLowerCase().includes(query) || country.region.toLowerCase().includes(query))
          .map((country) => {
            return (
              <CountryCard
                  key={country.name}
                  name={country.name}
                  flag={country.flags.svg}
                  population={country.population.toLocaleString("en-IN")}
                  region={country.region}
                  capital={country.capital}
                  data={country} 
                />
            )
          })}
      </div>
    </>
  )
}