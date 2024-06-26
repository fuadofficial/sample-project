import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    inputValue: "",
    items: [],
    editingIndex: -1  // Track which item is being edited
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { inputValue, editingIndex, items } = this.state;

    if (inputValue === "") {
      alert('Please Enter Any Values...');
    } else {
      if (editingIndex === -1) {  // Add new item
        this.setState({
          items: [...items, inputValue],
          inputValue: ""
        });
      } else {  // Update existing item
        const updatedItems = [...items];
        updatedItems[editingIndex] = inputValue;
        this.setState({
          items: updatedItems,
          inputValue: "",
          editingIndex: -1  // Reset editingIndex after saving
        });
      }
    }
  };

  deleteItem = (key) => {
    this.setState({
      items: this.state.items.filter((data, index) => index !== key)
    });
  };

  changeValue = (data, index) => {
    this.setState({
      inputValue: data,
      editingIndex: index  // Set editingIndex to the index of the item being edited
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.storeItems(event);
    }
  };

  render() {
    const { inputValue, items, editingIndex } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>
          <input
            ref={(input) => { this.inputRef = input; }}
            value={inputValue}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress} // Handle Enter key press
            type="text"
            placeholder="Enter Items...."
          />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyPress}
                />
              ) : (
                <span>{data}</span>
              )}
              <i onClick={() => this.changeValue(data, index)} className="fa-regular fa-pen-to-square icons"></i>
              <i onClick={() => this.deleteItem(index)} className="fa-solid fa-trash-can icons"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
