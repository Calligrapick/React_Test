import React, { Component } from "react";
import "./App.css";
import TextItem from "./TextItem";
import axios from "axios";
//이미지는 하나만 로드하고 새로 만들어지는걸 덮어씌우는 방식으로 해결할 수 있을듯
import wj from './images/wj.jpg'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  state = {
    num : "50",
    value: "",
    textList: []
  };

  componentDidMount() {
    this._renderText();
  }
  render() {
    const { textList } = this.state;
    console.log(textList);
    return (
      <div className="App">
      <input type="range" value={this.state.num}  onChange={this._handleSliderChange}/>
      <button onClick={this._handleSliderSubmit}>슬라이더 값 전송</button>
        <h1>OneLine App</h1>
        <div>
          <label>
            Text:
            <input
              type="text"
              value={this.state.value}
              onChange={this._handleTextChange}
            />
          </label>
          <button onClick={this._handleTextSubmit}>submit</button>
        </div>
        <h2>Long Text</h2>
        {textList.map((text, index) => {
          return (
            <TextItem
              text={text.text}
              key={index}
              id={text.id}
              handleClick={this._deleteText}
            />
          );
        })}
        <img src={wj} alt="이미지자리"/>
      </div>
    );
  }
  _handleSliderChange = event => {
    this.setState({ num: event.target.value });
  };
  _handleTextChange = event => {
    this.setState({ value: event.target.value });
  };
  _handleSliderSubmit = () => {
    const { num } = this.state;
    axios
      .post("http://localhost:8000/api/wisesaying/", { text: num })
      .then(res => this._renderText());
  };
  _handleTextSubmit = () => {
    const { value } = this.state;
    axios
      .post("http://localhost:8000/api/wisesaying/", { text: value })
      .then(res => this._renderText());
  };
  _renderText = () => {
    axios
      .get("http://localhost:8000/api/wisesaying/")
      .then(res => this.setState({ textList: res.data }))
      .catch(err => console.log(err));
  };
  _deleteText = id => {
    axios.delete(`http://localhost:8000/api/wisesaying/${id}`).then(res => this._renderText());
  };
}

export default App;
