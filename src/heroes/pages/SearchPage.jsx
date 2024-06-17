import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useForm } from "../../../hooks/useForm";
import { HeroCard } from "../components/HeroCard";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const heroes = getHeroesByName(searchText);

  //Se utiliza el estado currentPage para mantener el número de la página actual. Inicialmente se establece en 1.
  const [currentPage, setCurrentPage] = useState(1);
  //Se establece el número de resultados máximos por página
  const resultsPerPage = 2;

  const showResults = searchText.trim().length > 0;

  const onSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);
  }

  //Se calcula indexOfLastResult y indexOfFirstResult para determinar qué resultados mostrar en función de la página actual y el número de resultados por página (resultsPerPage).
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = heroes.slice(indexOfFirstResult, indexOfLastResult);

  //Esta función se utiliza para cambiar la página actual cuando el usuario hace clic en los botones de paginación.
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <h1>Buscador de héroes</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscando</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Busque a su héroe..."
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-3">Buscar</button>
          </form>
        </div>

        {showResults &&
          <div className="col-7">
            <h4>Resultados</h4>
            <hr />

            {currentResults.length === 0 &&
              <div className="alert alert-danger">
                No hay ningún resultado para <b>{searchText}</b>
              </div>
            }

            {currentResults.length > 0 &&
              <div>
                {currentResults.map(hero => (
                  <div key={hero.id} style={{ marginBottom: '150px' }}>
                    <HeroCard {...hero} />
                  </div>
                ))}
              </div>
            }

            {heroes.length > resultsPerPage &&
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(heroes.length / resultsPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            }

          </div>
        }
      </div>

    </>
  )
}