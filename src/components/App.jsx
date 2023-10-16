import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const [countryList, setCountryList] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [selectContinent, setSelectContinent] = useState('all');

  useEffect(() => {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flag,continents'
    )
      .then((response) => response.json())
      .then((data) => {
        setCountryList(data);
        console.log(data);
      });
  }, []);

  // Recoger el dato del pais y guardarlo
  const handleInputSearch = (ev) => {
    setNameSearch(ev.target.value);
  };

  // Recoger el select del continente
  const handleSelectContinent = (ev) => {
    setSelectContinent(ev.target.value);
  };

  // Pintar el array de paises y filtrar
  const renderCountries = () => {
    return countryList
      .filter((eachCountry) => {
        const nameResult =
          eachCountry.name.common
            .toLowerCase()
            .includes(nameSearch.toLowerCase()) || nameSearch === '';

        const continentResult =
          selectContinent === 'all' ||
          eachCountry.continents.includes(selectContinent.toLowerCase());
        return nameResult && continentResult;
      })
      .map((eachCountry, index) => (
        <li className='country__item' key={index}>
          <p>{eachCountry.flag}</p>
          <p>{eachCountry.name.common}</p>
          <p>{eachCountry.capital}</p>
          <p>{eachCountry.continents}</p>
        </li>
      ));
  };

  return (
    <div className='page'>
      {/* header */}
      <header className='header'>
        <h1 className='header__title'>Country Info App</h1>
        <form>
          <input
            className='header__search'
            autoComplete='off'
            type='search'
            name='search'
            placeholder='Spain...'
            onChange={handleInputSearch}
          />
          <select
            className='header__search'
            name='continent'
            id='continent'
            value={selectContinent}
            onChange={handleSelectContinent}
          >
            <option value='all'>All</option>
            <option value='north america'>North America</option>
            <option value='south america'>South America</option>
            <option value='europe'>Europe</option>
            <option value='asia'>Asia</option>
            <option value='oceania'>Oceania</option>
          </select>
        </form>
      </header>

      <main>
        {/* new contact */}
        <form className='new-country__form'>
          <h2 className='new-country__title'>Add Country</h2>
          <input
            className='new-country__input'
            type='text'
            name='name'
            id='name'
            placeholder='Country Name'
          />
          <input
            className='new-country__input'
            type='text'
            name='capital'
            id='capital'
            placeholder='Capital'
          />
          <input
            className='new-country__input'
            type='url'
            name='flag icon'
            id='flag icon'
            placeholder='Flag icon'
          />
          <input
            className='new-country__input'
            type='text'
            name='continent'
            id='continent'
            placeholder='Continent'
          />
          <input className='new-country_btn' type='submit' value='Añadir' />
        </form>
        {/* country list */}
        <ul className='country__list'>{renderCountries()}</ul>
      </main>
    </div>
  );
}
export default App;
