import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';

class App extends React.Component {
  
HandleLogin = async (event) => {
event.preventDefault();
const login = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username:'admin'  , password:'password' })
};
try {
    const response = await fetch('https://concierge.cooperstandard.org:8443/api/user/login', login)
    const data = await response.json();
    console.log(data)
    if (data.message == "Wrong details please check at once") {
        throw new Error("Error with login");
    } else {
        this.setState({ token: data.token })
        this.HandleAuth(data)
    }
} catch (error) {
    console.log(error);
    this.setState({ error: error })
}
}
HandleRecipe=async(event)=> {
event.preventDefault();
const recipe = {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({title:event.target.title.value,description:event.target.description.value,
    ingredients:event.target.ingredients.value,allergens:event.target.allergens.value, photos:event.target.photos.value,
    instructions:event.target.instructions.value, prepTime:event.target.prepTime.value+'min'})
    };
try{
    const response = await fetch('https://concierge.cooperstandard.org:8443/api/recipe',recipe);
    const data = await response.json();
}catch(e){
    console.log(e);
}
}
render() {
return(
        <div className="background">
        <h1 className ="titleText">Add Your Recipe</h1>
        <form on submit = {this.HandleRecipe}>
            <input type ="text" id="title" name ="title" className="titleBox" placeholder ="Title"></input>
            <input type ="text" id="description" name="description" className="descBox" placeholder="Description"></input>
            <input type ="text" id="ingredients" name="ingredients" className="ingBox" placeholder="Ingredients"></input>
            <input type ="text" id="allergens" name="allergens" className="algBox" placeholder="Allergens"></input>
            <input type ="text" id="photos" name="photos" className="photoBox" placeholder="Photos"></input>
            <input type ="text" id="instructions" name="instructions" className="instBox" placeholder="Instructions"></input>
            <input type ="text" id="prepTime" name="prepTime" className="ptimeBox" placeholde="PrepTime"></input>
            
            <button type="submit" className ="submitRecipe">
                <h2 className="SubmitRecipe">Submit</h2>
            </button>
        </form>
    </div>    
    )
}

}

export default App;
