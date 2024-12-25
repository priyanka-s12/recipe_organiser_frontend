import Header from '../components/Header';
import { useState } from 'react';
import useFetch from '../useFetch';

const AddRecipe = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState([]);

  const cuisines = ['Italian', 'Indian', 'Thai', 'Mexican', 'Chinese'];

  const formHandler = async (event) => {
    event.preventDefault();

    // console.log(
    //   name,
    //   cuisineType,
    //   image,
    //   ingredients.split(', '),
    //   instructions.split('. ')
    // );

    const newData = {
      name,
      cuisineType,
      image,
      ingredients: ingredients.split(', '),
      instructions: instructions.split('. '),
    };

    try {
      const response = await fetch(
        'https://recipe-organiser-backend-xi.vercel.app/recipes',
        {
          method: 'POST',
          body: JSON.stringify(newData),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw 'Recipe not added';
      }

      const data = await response.json();
      console.log('Added recipe', data);
      setSuccessMessage(true);

      setName('');
      setCuisineType('');
      setImage('');
      setIngredients(''), setInstructions('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <main className="container py-3">
        <section>
          <h3>Add Recipe</h3>
          {successMessage && (
            <p className="alert alert-success">Date added successfully...!!!</p>
          )}
          <form onSubmit={formHandler}>
            <div className="my-3">
              <label>Name: </label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label>Cuisine Type: </label>
              <br />
              <select
                value={cuisineType}
                onChange={(event) => setCuisineType(event.target.value)}
                required
              >
                <option>--Select Cuisine Type--</option>
                {cuisines.map((cuisine, index) => (
                  <option key={index}>{cuisine}</option>
                ))}
              </select>
            </div>
            <div className="my-3">
              <label>Image Link: : </label>
              <br />
              <input
                type="text"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label>Ingredients: </label>
              <br />
              <textarea
                id="ingredients"
                rows="3"
                cols="30"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
                required
              ></textarea>
            </div>
            <div className="my-3">
              <label>Instructions: </label>
              <br />
              <textarea
                id="instructions"
                rows="3"
                cols="30"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddRecipe;
