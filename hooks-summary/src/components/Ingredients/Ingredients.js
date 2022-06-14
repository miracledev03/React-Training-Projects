import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const {
    isLoading,
    error,
    data,
    reqExtra,
    reqIdentifier,
    sendRequest,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({ type: "ADD", ingredient: { id: data.name, ...reqExtra } });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filtredIngredientsHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients);

    dispatch({
      type: "SET",
      ingredients: filteredIngredients,
    });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      // setIsLoading(true);

      // dispatchHttp({
      //   type: "SEND",
      // });

      sendRequest(
        "https://hooks-training-7ae73-default-rtdb.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const removeItemHandler = useCallback(
    (id) => {
      // setIsLoading(true);

      // dispatchHttp({
      //   type: "SEND",
      // });

      // fetch(
      //   `https://hooks-training-7ae73-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      //   {
      //     method: "DELETE",
      //   }
      // )
      //   .then((response) => {
      //     // setIsLoading(false);

      //     dispatchHttp({
      //       type: "RESPONSE",
      //     });

      //     // setUserIngredients((prevIngredients) => {
      //     //   return prevIngredients.filter((item) => item.id !== id);
      //     // });

      //     dispatch({
      //       type: "DELETE",
      //       id: id,
      //     });
      //   })
      //   .catch((error) => {
      //     // setError("Something went wrong!");
      //     // setIsLoading(false);

      //     dispatchHttp({
      //       type: "ERROR",
      //     });
      //   });

      sendRequest(
        `https://hooks-training-7ae73-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  // const clearError = useCallback(() => {
  //   // setError(null);

  //   // dispatchHttp({
  //   //   type: "CLEAR",
  //   // });

  // }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeItemHandler}
      />
    );
  }, [userIngredients, removeItemHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filtredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
