import { useState } from "react";
import router from "next/router";

const Form = ({ formId, petForm, forNewPet = true }) => {
  //   const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [moviename, setMoviename] = useState("");
  const [reviewtext, setReviewtext] = useState("");

  const postData = async () => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({
          movie_name: moviename,
          review_text: reviewtext,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      console.log("it worked");
      setMoviename("");
      setReviewtext("");

      router.push("/");
    } catch (error) {
      console.log(error);
      setMessage("Failed to add review");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <>
      <form id={formId} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="movie_name">Movie Name</label>
        <input
          type="text"
          name="movie_name"
          value={moviename}
          onChange={(e) => setMoviename(e.target.value)}
          required
        />

        <label htmlFor="review_text">Review Text</label>
        <input
          type="text"
          maxLength="20"
          name="review_text"
          value={reviewtext}
          onChange={(e) => setReviewtext(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
