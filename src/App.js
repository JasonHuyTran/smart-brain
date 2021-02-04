import React, {Component} from 'react';
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import apiKey from "./apikey"
 

import Navigation from "./components/Navigation/Navigation.components"
import Logo from "./components/Logo/Logo.components"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.components"
import Rank from "./components/Rank/Rank.component"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.component"


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchField: "",
      imageUrl: ''
    }
  }

  onImageLinkFormChange = (event) => {
    this.setState({searchField: event.target.value})
  } 

  onSubmit = () => {
    this.setState({imageUrl: this.state.searchField});

    apiKey.models
     .predict(
     Clarifai.FACE_DETECT_MODEL,
     // THE JPG
     this.state.searchField
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
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
      </div>
    )
  };
}

export default App;