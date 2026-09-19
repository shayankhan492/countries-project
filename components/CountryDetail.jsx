// import { useEffect, useState } from "react";
// import "./CountryDetail.css";
// import { Link, useLocation, useParams } from "react-router-dom";
// import CountryDetailShimmer from "./CountryDetailShimmer";
// import { useTheme } from "../hooks/useTheme";

// export default function CountryDetails() {
//   const [isDark] = useTheme()
//   const params = useParams();
//   const { state } = useLocation();

//   const countryName = params.country;
//   const [countryData, setCountryData] = useState(null);
//   const [notFound, setNotFound] = useState(false);

//   function updateCountryData(data) {
//     setCountryData({
//       name: data.name,
//       nativeName: data.nativeName,
//       population: data.population,
//       region: data.region,
//       subRegion: data.subregion,
//       capital: data.capital,
//       flags: data.flags?.png || data.flags?.svg || data.flag,
//       tld: data.tld,
//       topLevelDomain: data.topLevelDomain?.[0] || "",
//       currencie:
//         data.currencies?.map((currency) => currency.name).join(", ") || "",
//       language:
//         data.languages?.map((language) => language.name).join(", ") || "",
        
//       borders: [],
//     });

//     if (!data.borders) {
//       data.borders = [];
//     }

//     Promise.all(
//       data.borders.map((border) => {
//         return fetch(`https://countries.dev/alpha/${border}`)
//           .then((res) => res.json())
//           .then((borderCountry) => borderCountry.name);
//       }),
//     ).then((borders) => {
//       setTimeout(() =>
//         setCountryData((prevData) => ({
//           ...prevData,
//           borders,
//         })),
//       );
//     });
//   }


//   useEffect(() => {
//     if (state) {
//       updateCountryData(state);
//       return;
//     }

//     fetch(`https://countries.dev/name/${encodeURIComponent(countryName)}`)
//       .then((res) => res.json())
//       .then(([data]) => {
//         updateCountryData(data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setNotFound(true);
//       });
//   }, [countryName]);

//   return countryData === null ? (
//     <CountryDetailShimmer />
//   ) : (
//     <main className = {`${isDark ? 'dark' : ''}`}>
//       <div className="country-details-container">
//         <span className="back-button" onClick={() => history.back()}>
//           <i className="fa-solid fa-arrow-left"></i>&nbsp;Back
//         </span>
//         <div className="country-details">
//           <img src={countryData.flags} alt={countryData.name} />
//           <div className="details-text-container">
//             <h1>{countryData.name}</h1>
//             <div className="details-text">
//               <p>
//                 <b>Native Name: {countryData.nativeName}</b>
//                 <span className="native-name"></span>
//               </p>
//               <p>
//                 <b>Population: {countryData.population}</b>
//                 <span className="country-population"></span>
//               </p>
//               <p>
//                 <b>Region: {countryData.region}</b>
//                 <span className="country-region"></span>
//               </p>

//               <p>
//                 <b>Sub Region: {countryData.subRegion}</b>
//                 <span className="country-subRegion"></span>
//               </p>
//               <p>
//                 <b>Capital: {countryData.capital}</b>
//                 <span className="country-capital"></span>
//               </p>
//               <p>
//                 <b>Top Level Domain: {countryData.topLevelDomain}</b>
//                 <span className="country-domain"></span>
//               </p>
//               <p>
//                 <b>Currencies: {countryData.currencie}</b>
//                 <span className="country-currencies"></span>
//               </p>
//               <p>
//                 <b>languages: {countryData.language}</b>
//                 <span className="country-language"></span>
//               </p>
//             </div>
//             {countryData.borders.length !== 0 && (
//               <div className="border-countries">
//                 <b>Border Countries: </b>
//                 {countryData.borders.map((border) => (
//                   <Link key={border} to={`/${border}`}>
//                     {border}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

//or

import React, { useEffect, useState } from 'react'

import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import CountryDetailShimmer from './CountryDetailShimmer'

export default function CountryDetail() {
  const [isDark] = useTheme()
  const params = useParams()
  const { state } = useLocation()

  const countryName = params.country
  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function updateCountryData(data) {
    setCountryData({
      name: data.name,
      nativeName: data.nativeName,
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital,
      // flags: data.flags?.png || data.flags?.svg || data.flag,
      flags: data.flags?.svg || data.flags?.png || data.flag,
      tld: data.tld,
      topLevelDomain: data.topLevelDomain?.[0] || "",
      currencie:
        data.currencies?.map((currency) => currency.name).join(", ") || "",
      language:
        data.languages?.map((language) => language.name).join(", ") || "",
        
      borders: [],
    });

    if (!data.borders) {
      data.borders = []
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://countries.dev/alpha/${border}`)
          .then((res) => res.json())
          .then((borderCountry) => borderCountry.name)
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      )
    })
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state)
      return
    }

    fetch(`https://countries.dev/name/${encodeURIComponent(countryName)}`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data)
      })
      .catch((err) => {
        console.log(err)
        setNotFound(true)
      })
  }, [countryName])

  if (notFound) {
    return <div>Country Not Found</div>
  }

  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flags} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>
                    Native Name: {countryData.nativeName || countryData.name}
                  </b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>
                    Population: {countryData.population.toLocaleString('en-IN')}
                  </b>
                  <span className="country-population"></span>
                </p>
                <p>
                  <b>Region: {countryData.region}</b>
                  <span className="country-region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subRegion}</b>
                  <span className="country-subRegion"></span>
                </p>
                <p>
                  <b>Capital: {countryData.capital}</b>
                  <span className="country-capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.topLevelDomain}</b>
                  <span className="country-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currencie}</b>
                  <span className="country-currencies"></span>
                </p>
                <p>
                  <b>Languages: {countryData.language}</b>
                  <span className="country-languages"></span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}