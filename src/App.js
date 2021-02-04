import React, {Component} from 'react';
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
 

import Navigation from "./components/Navigation/Navigation.components"
import Logo from "./components/Logo/Logo.components"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.components"
import Rank from "./components/Rank/Rank.component"

const app = new Clarifai.App({
  apiKey: "e00be534dce74eadb42b6cc32fed1876",
 });

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchField: "",
    }
  }

  onImageLinkFormChange = (event) => {
    this.setState({searchField: event.target.value})
  } 

  onSubmit = () => {
    console.log("click");
    app.models
     .predict(
     Clarifai.FACE_DETECT_MODEL,
     // THE JPG
     "https://i.insider.com/5d321d4ea209d3146d650b4a?width=1100&format=jpeg&auto=webp"
     )
     .then((response) => {
      console.log(response);
     })
     .catch((err) => {
      console.log(err);
     });
  };    

  render() {
    const particlesOptions = {
      particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
          }
        }
      }
    }

    return (
      <div className = "App">
        <Particles className = "particles"
              params={particlesOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm imageLinkFormChange = {this.onImageLinkFormChange} submit = {this.onSubmit}/>
        {/* <FaceRecognition /> */}
      </div>
    )
  };
}

export default App;


//e00be534dce74eadb42b6cc32fed1876 our own api key 