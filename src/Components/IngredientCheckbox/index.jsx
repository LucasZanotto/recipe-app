// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function HandleRecipeBtn() {
//   const [recipesLS, setRecipesLS] = useState({});
//   const [isStarded, setIsStarted] = useState('false');

//   const { pathname } = useLocation();
//   const pathnameSplited = pathname.split('/');
//   const category = pathnameSplited[1];
//   const id = pathnameSplited[2];
//   console.log(category, id);

//   useEffect(() => {
//     const doneRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));

//     setRecipesLS(doneRecipesLS);
//     if (doneRecipesLS && Object.keys(doneRecipesLS).includes(pathname)) {
//       setIsStarted(true);
//     } else {
//       setIsStarted(false);
//     }
//   }, []);

//   const handleCLick = () => {
//     setIsStarted(true);
//     setRecipesLS({
//       ...recipesLS,
//       [pathname]: { stage: 1 },
//     });

//     localStorage.setItem('inProgressRecipes', JSON.stringify({
//       ...recipesLS,
//       {
//         [category] : {
//           [id]: { stage: 1 },
//         }
//       }
//     }));
//   };

//   return (
//     <div>
//       {
//         isStarded ? (
//           <button
//             type="button"
//             data-testid="continue-recipe-btn"
//             onClick={ handleCLick }
//           >
//             Continue Recipe
//           </button>
//         ) : (
//           <button
//             type="button"
//             data-testid="start-recipe-btn"
//             onClick={ handleCLick }
//           >
//             Start Recipe
//           </button>
//         )

//       }
//     </div>
//   );
// }
