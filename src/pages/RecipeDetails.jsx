import Header from '../components/Header';
import { useParams } from 'react-router';
import useFetch from '../useFetch';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  //   console.log(recipeId);

  const apiUrl = `https://recipe-organiser-backend-xi.vercel.app/recipes`;
  const { data, loading, error } = useFetch(apiUrl);
  //   console.log(data);

  const recipeDetail = data?.find((recipe) => recipe._id == recipeId);
  //   console.log(recipeDetail);

  return (
    <>
      <Header />
      <main className="container py-3">
        <section>
          {loading && <p className="alert alert-primary">Loading...</p>}
          {error && <p className="alert alert-danger">No recipe found.</p>}

          {recipeDetail && (
            <div>
              <h2 className="mb-3">{recipeDetail?.name}</h2>
              <div className="card">
                <div className="row">
                  <div className="col-md-4" style={{ height: '500px' }}>
                    <img
                      src={recipeDetail.image}
                      alt={`${recipeDetail.name} cover image`}
                      className="object-fit-cover img-fluid rounded-start h-100"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h3>Cuisine: {recipeDetail.cuisineType}</h3>
                      <h4>Ingredients: </h4>
                      <p class="card-text">
                        {recipeDetail.ingredients.join(', ')}
                      </p>
                      <h4>Instructions: </h4>
                      <ol>
                        {recipeDetail.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
export default RecipeDetails;
