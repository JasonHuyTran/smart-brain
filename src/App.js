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
      imageUrl: '',
      boxes: []
    }
  }

  calculateFaceLocation = (data) => {
    const arrOfFacesLocation = data.outputs[0].data.regions;
    const image = document.querySelector("#inputimage")
    const width = Number(image.width);
    const height = Number(image.height);
    
    const editedArrOfFaceLocations = arrOfFacesLocation.map(faceLocation => {
      const bounding_box = faceLocation.region_info.bounding_box;

      return {
        leftCol: bounding_box.left_col * width,
        topRow: bounding_box.top_row * height,
        rightCol: width - (bounding_box.right_col * width),
        bottomRow: height - (bounding_box.bottom_row * height)
      }
    });
    
    return editedArrOfFaceLocations;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onImageLinkFormChange = (event) => {
    this.setState({searchField: event.target.value})
  } 

  onSubmit = () => {
    this.setState({imageUrl: this.state.searchField});

    apiKey.models
     .predict (
     Clarifai.FACE_DETECT_MODEL,
     this.state.searchField
     )
     .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response)))
     .catch((err) => console.log(err));
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
        <FaceRecognition boxes = {this.state.boxes} imageUrl = {this.state.imageUrl}/>
      </div>
    )
  };
}

export default App;

//test face: https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg