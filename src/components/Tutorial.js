import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";

const Tutorial = (props) => {
  const initialTutorialState = {
    name: "",
    country: "",
    position: "",
    id: null,
    title: "",
    published: false,
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status) => {
    let data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then((response) => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>{currentTutorial.title}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Имя</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Страна</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={currentTutorial.country}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Статус:</strong>
              </label>
              {currentTutorial.published ? "Опубликовано" : "В ожидании"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              В ожидание...
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Опубликовать
            </button>
          )}

          <Link to="/tutorials">
            <button
              className="badge badge-danger mr-2"
              onClick={deleteTutorial}
            >
              Удалить
            </button>
          </Link>

          <Link to="/tutorials">
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateTutorial}
            >
              Редактировать
            </button>
          </Link>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>что дальше?</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
