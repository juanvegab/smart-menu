import React, { FormEvent, useState } from 'react';
import './App.css';
import { MealNutritionalPlan } from './constants/types';
import { AI_API_KEY, FOOD_GROUP_MAP } from './constants/constants';
const baseNutriPlan: MealNutritionalPlan = {
  fruits: 0,
  vegetables: 0,
  grains: 2,
  protein: 3,
  dairy: 0,
  fatsAndOils: 1,
  sugarsAndSweets: 0,
}

function App() {
  const [mealPlan, setMealPlan] = useState<MealNutritionalPlan>(baseNutriPlan);
  const [isGluttenFree, setIsGluttenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [mealTime, setMealTime] = useState('dinner');
  const [mealPossibilities, setMealPossibilities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    sendRequest(mealPlan);
  };

  const getMealPlan = (mealPlan: MealNutritionalPlan) => {
    return FOOD_GROUP_MAP.map(g => `${mealPlan[g.key]} ${g.label}`).join(', ')
  };

  const shouldBeGluttenFree = () => {
    return isGluttenFree ? ' All options should be glutten-free.' : '';
  };

  const shouldBeLactoseFree = () => {
    return isLactoseFree ? ' All options should be lactose-free.' : '';
  };

  const sendRequest = (mealPlan: MealNutritionalPlan) => {
    const content = "You are a nutritionist and you have a client who wants to eat healthy."
      + `Provide in spanish 3 options for ${mealTime} with: `
      + getMealPlan(mealPlan) 
      + ". Include the measure of each portion."
      + shouldBeGluttenFree()
      + shouldBeLactoseFree();
      // + "Return the results as a JSON array";
    const messageObj = {
      model: "gpt-3.5-turbo",
      messages: [{role: "system", content}]
    };

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageObj),
    })
    .then((response) => response.json())
    .then(value => {
      // setMealPossibility(value.choices[0].message.content);
      console.log(value.choices[0].message?.content.split("Opción"));
      setMealPossibilities(value.choices[0].message?.content.split("Opción"));
      setIsLoading(false);
    })
    .catch((error) => console.error('An error occurred:', error));
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <p>Set your nutritional plan and request possible meals:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Meal Time:
            <select value={mealTime} onChange={(e) => setMealTime(e.target.value)}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Fruits:
            <input type="number" min={0} value={mealPlan.fruits} onChange={(e) => setMealPlan({...mealPlan, fruits: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            Vegetables:
            <input type="number" min={0} value={mealPlan.vegetables} onChange={(e) => setMealPlan({...mealPlan, vegetables: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            Grains:
            <input type="number" min={0} value={mealPlan.grains} onChange={(e) => setMealPlan({...mealPlan, grains: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            Protein:
            <input type="number" min={0} value={mealPlan.protein} onChange={(e) => setMealPlan({...mealPlan, protein: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            Dairy:
            <input type="number" min={0} value={mealPlan.dairy} onChange={(e) => setMealPlan({...mealPlan, dairy: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            Fats and Oils:
            <input type="number" min={0} value={mealPlan.fatsAndOils} onChange={(e) => setMealPlan({...mealPlan, fatsAndOils: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            SugarsAndSweets:
            <input type="number" min={0} value={mealPlan.sugarsAndSweets} onChange={(e) => setMealPlan({...mealPlan, sugarsAndSweets: Number(e.target.value)})} />
          </label>
          <br />
          <label>
            Is glutten Free:
            <input type="checkbox" onChange={() => setIsGluttenFree(!isGluttenFree)} checked={isGluttenFree} />
          </label>
          <br />
          <label>
            Is lactose Free:
            <input type="checkbox" onChange={() => setIsLactoseFree(!isLactoseFree)} checked={isLactoseFree} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        { mealPossibilities && mealPossibilities.map((m, i) => 
          <div key={`meal_option_${i}`}>
            <p style={{whiteSpace: 'pre-wrap'}}>{m.replaceAll(" - ", "\n\n")}</p>
            <br/>
          </div>
        )}
        { isLoading && <p>Loading...</p> }
      </div>
    </div>
  );
}

export default App;
