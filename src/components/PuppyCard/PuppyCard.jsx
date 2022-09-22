import { Link } from "react-router-dom";

const PuppyCard = ({ puppy, randDogImgId, handleDeletePuppy, user }) => {
  return (
    <>
      <div className="card">
        <img
          src={
            puppy.photo
              ? puppy.photo
              : `https://picsum.photos/id/${randDogImgId}/640/480`
          }
          alt="A happy puppy"
          className="card-img-top"
        />
        <div className="card-body">
          <h2 className="card-text">{puppy.name}</h2>
          <p className="card-text">
            {puppy.owner?.name}'s {puppy.age}-year-old {puppy.breed}
          </p>
        </div>
        {user?.profile === puppy.owner?._id && (
          <div className="card-footer">
            <Link
              to="/edit"
              className="btn btn-sm btn-warning"
              state={{ puppy }}
            >
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger m-left"
              onClick={() => handleDeletePuppy(puppy._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PuppyCard;
