import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const [filtrItem, setFiltrItem] = useState([]);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  useEffect(() => {
    retrieveTutorials();
  }, [tutorials]);

  useEffect(() => {
    setFiltrItem(
      tutorials.filter((t) => {
        return t.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, tutorials]);

  return (
    <div className="list row">
      <div className="col-md-8">
        <input
          className="form-control"
          placeholder="Поиск по заголовку"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <h4>Все контакты</h4>
        <ul className="list-group">
          {tutorials &&
            filtrItem.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                title: <span>{tutorial.title}</span>
                <br></br>
                country: <span>{tutorial.country}</span>
                <br></br>
                position: <span>{tutorial.position}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Контакт</h4>
            <div>
              <label>
                <strong>Имя:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Страна:</strong>
              </label>{" "}
              {currentTutorial.country}
            </div>
            <div>
              <label>
                <strong>Должность:</strong>
              </label>{" "}
              {currentTutorial.position}
            </div>
            <div>
              <label>
                <strong>Статус:</strong>
              </label>{" "}
              {currentTutorial.published ? "Опубликовано" : "В ожидании"}
            </div>

            <Link
              to={`/tutorials/${currentTutorial.id}`}
              className="badge badge-warning"
            >
              Редактировать
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Выберите котнакт</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
