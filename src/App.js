import React, {Component} from 'react';
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';
 

import Navigation from "./components/Navigation/Navigation.components"
import Logo from "./components/Logo/Logo.components"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.components"
import Rank from "./components/Rank/Rank.component"


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
        <ImageLinkForm imageLinkFormChange = {this.onImageLinkFormChange}/>
        {/* <FaceRecognition /> */}
      </div>
    )
  };
}

export default App;
