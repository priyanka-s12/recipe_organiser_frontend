import useFetch from '../useFetch';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const [query, setQuery] = useState('');
  const apiUrl = 'http://localhost:3000/recipes';
  const { data, loading, error } = useFetch(apiUrl);
  //   console.log(data);

  //   console.log(query);
  const filteredRecipes = query
    ? data?.filter((recipe) => recipe.name.toLowerCase().includes(query))
    : data;

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'DELETE',
      });

      const data = response.json();
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container py-3">
      <section>
        <input
          type="text"
          placeholder="Search by recipe name..."
          className="form-control w-50"
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="mt-3">
        <h3 className="mb-3">All Recipes:</h3>
        {loading && <p className="alert alert-primary">Loading...</p>}
        {error && (
          <p className="alert alert-danger">
            An error occured while fetching recipes
          </p>
        )}

        {data && data.length > 0 && (
          <>
            <div className="row">
              {filteredRecipes?.map((recipe) => (
                <div className="col-md-3" key={recipe._id}>
                  <div className="card mb-3">
                    <img
                      src={recipe.image}
                      alt={`${recipe.name} cover image`}
                      className="img-fluid rounded-start object-fit-cover"
                      style={{ height: '500px' }}
                    />
                    <div className="card-body">
                      <h4 className="mb-3">{recipe.name}</h4>
                      <p>
                        <strong>Cuisine Type: </strong>
                        {recipe.cuisineType}
                      </p>
                      <p>
                        <strong>Ingredients: </strong>
                        <Link to={`/recipes/${recipe._id}`}>
                          See Recipe &gt;
                        </Link>
                      </p>
                      <p>
                        <strong>Instructions: </strong>
                        <Link to={`/recipes/${recipe._id}`}>
                          See Recipe &gt;
                        </Link>
                      </p>
                      <Link
                        className="btn btn-danger"
                        onClick={() => deleteHandler(recipe._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Recipes;
