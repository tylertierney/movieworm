import Form from "../components/Form";

const NewReview = () => {
  const reviewForm = {
    movie_name: "",
    owner_name: "",
  };

  return <Form formId="add-pet-form" petForm={reviewForm} />;
};

export default NewReview;
