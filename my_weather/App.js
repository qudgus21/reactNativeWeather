import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Weather from "./Weather";

const API_KEY = "262982f6f64a6c497e6a5d3ebca4e8ae";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      error: null,
      temperature: null,
      name: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error
        });
      }
    );
  }

  _getWeather = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {this.state.isLoaded ? (
          <Weather
            weatherName={this.state.name}
            temp={Math.floor(this.state.temperature - 273.15) + " ℃"}
          />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather..</Text>
            {this.state.error ? (
              <Tex style={styles.errorText}>{error}</Tex>
            ) : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end",
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 35,
    marginBottom: 130
  }
});
