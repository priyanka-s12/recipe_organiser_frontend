import Header from '../components/Header';
import { useParams } from 'react-router';
import useFetch from '../useFetch';
import { useState } from 'react';

const datas = () => {
  const { recipeId } = useParams();

  const apiUrl = `https://recipe-organiser-backend-xi.vercel.app/recipes/${recipeId}`;
  const { data, loading, error } = useFetch(apiUrl);
  console.log(data);

  return (
    <>
      <Header />
      <main className="container py-3">
        <section>
          {error && <p className="alert alert-danger">No recipe found.</p>}
          {data ? (
            <div>
              <h2 className="mb-3">{data.name}</h2>
              <div className="card">
                <div className="row">
                  <div className="col-md-4" style={{ height: '500px' }}>
                    <img
                      src={data.image}
                      alt={`${data.name} cover image`}
                      className="object-fit-cover img-fluid rounded-start h-100"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h3>Cuisine: {data.cuisineType}</h3>
                      <h4>Ingredients: </h4>
                      <p className="card-text">{data.ingredients.join(', ')}</p>
                      <h4>Instructions: </h4>
                      <ol>
                        {data.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            loading && <p className="alert alert-primary">Loading...</p>
          )}
        </section>
      </main>
    </>
  );
};
export default datas;
