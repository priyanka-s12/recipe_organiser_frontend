import Header from '../components/Header';
import { useState } from 'react';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');

  const formHandler = async (event) => {
    event.preventDefault();

    // console.log(
    //   name,
    //   cuisineType,
    //   image,
    //   ingredients.split(', '),
    //   instruction.split('. ')
    // );

    const newData = {
      name,
      cuisineType,
      image,
      ingredients: ingredients.split(', '),
      instruction: instruction.split('. '),
    };

    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (response.ok) {
        setName('');
        setCuisineType('');
        setImage('');
        setIngredients(''), setInstruction('');
      } else {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);
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
              <input
                type="text"
                id="cuisineType"
                value={cuisineType}
                onChange={(event) => setCuisineType(event.target.value)}
                required
              />
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
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
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
