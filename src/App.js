import React, {Component} from 'react';
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';
 

import Navigation from "./components/Navigation/Navigation.components"
import Logo from "./components/Logo/Logo.components"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.components"
import Rank from "./components/Rank/Rank.component"


class App extends Component {
  render() {
    const particlesOptions = {
      particles: {
        line_linked: {
          shadow: {
            enable: true,
            color: "#3CA9D1",
            blur: 5
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
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
