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
import Signin from "./components/Signin/Signin.component"
import Register from "./components/Register/Register.component"


const initialState = {
  searchField: "",
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();

    this.state = initialState;
    
  }

  loadUser = ((data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})

    //console.log(this.state.user);
  });

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
     .then(response =>  {
      if (response) {
        fetch('https://nameless-crag-92776.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
     })
     .catch((err) => console.log(err));
  };    

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    } 
    else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

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

    const {isSignedIn, boxes, imageUrl, route} = this.state;

    return (
      <div className = "App">
        <Particles className = "particles"
              params={particlesOptions}
            />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        {route === 'home' 
        ? <div>
            <Logo />
            <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
            <ImageLinkForm imageLinkFormChange = {this.onImageLinkFormChange} submit = {this.onSubmit}/>
            <FaceRecognition boxes = {boxes} imageUrl = {imageUrl}/>
          </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
            : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
          )
        }

      </div>
    )
  };
}

export default App;

//test face: https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg