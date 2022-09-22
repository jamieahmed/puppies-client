import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const EditPuppy = (props) => {
  const formElement = useRef();
  const location = useLocation();
  const [validForm, setValidForm] = useState(false);
  const [formData, setFormData] = useState(location.state.puppy);
  const [photoData, setPhotoData] = useState({});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleChangePhoto = (evt) => {
    setPhotoData({ photo: evt.target.files[0] });
  };

  useEffect(() => {
    formElement.current.checkValidity()
      ? setValidForm(true)
      : setValidForm(false);
  }, [formData]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleUpdatePuppy(formData, photoData.photo);
  };

  return (
    <>
      <h1>Edit Puppy</h1>
      <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name-input" className="form-label">
            Puppy's Name (required)
          </label>
          <input
            type="text"
            className="form-control"
            id="name-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="breed-input" className="form-label">
            Puppy's Breed (required)
          </label>
          <input
            type="text"
            className="form-control"
            id="breed-input"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="age-input" className="form-label">
            Puppy's Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age-input"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="photo-upload" className="form-label">
            {formData.photo ? "Replace existing photo" : "Add photo"}
          </label>
          <input
            type="file"
            className="form-control"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary btn-fluid"
            disabled={!validForm}
          >
            Edit Puppy
          </button>
          <Link to="/" className="btn btn-danger btn-fluid">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};

export default EditPuppy;
