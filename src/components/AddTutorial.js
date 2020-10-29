import React, { useState } from "react";
import { Link } from "react-router-dom";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const initialTutorialState = {
    name: "",
    country: "",
    position: "",
    id: null,
    title: "",
    published: false,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const data = {
      title: tutorial.title,
      country: tutorial.country,
      position: tutorial.position,
    };

    TutorialDataService.create(data)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          country: response.data.country,
          position: tutorial.position,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Новый контакт добавлен!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Добавить ещё
          </button>
          <br></br>
          <br></br>
          <Link to={"/tutorials"} className="btn btn-success">
            Вернуться
          </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Имя</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Страна</label>
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={tutorial.country}
              onChange={handleInputChange}
              name="country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Должность</label>
            <input
              type="text"
              className="form-control"
              id="position"
              required
              value={tutorial.position}
              onChange={handleInputChange}
              name="position"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Подтвердить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
