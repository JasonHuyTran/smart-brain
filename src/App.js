import React, {Component} from 'react';
import './App.css';
import 'tachyons'

import Navigation from "./components/Navigation/Navigation.components"
import Logo from "./components/Logo/Logo.components"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.components"


class App extends Component {
  render() {
    return (
      <div className = "App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
