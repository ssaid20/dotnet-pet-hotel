import React, { Component } from "react";
import PetsTable from "./PetsTable";
import PetOwnersTable from "./PetOwnersTable";
import axios from "axios";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import Transaction from "./Transactions";

class Home extends Component {
  static displayName = Home.name;


  
  fetchPetOwners = async () => {
    const response = await axios.get(`/api/petowners/?start=0&limit=10`);
    this.props.dispatch({ type: "SET_PETOWNERS", payload: response.data });
    console.log("%cHello world, %cand Hello Joe", "color: blue; font-size: 20px;", "color: violet; font-weight: bold; font-size: 8px");
    

  };

    
  constructor(props) {
    super(props);
    this.state = {
      konamiCodeEntered: false
    };
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.currentPosition = 0;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.key === this.konamiCode[this.currentPosition]) {
      this.currentPosition++;

      if (this.currentPosition === this.konamiCode.length) {
        this.setState({ konamiCodeEntered: true });
        this.currentPosition = 0; // Reset the position
      }
    } else {
      this.currentPosition = 0; // Reset if the sequence is broken
    }
  };

  render() {
    if (this.state.konamiCodeEntered) {
      return (
        <div>
          <h1>Konami Code Activated!</h1>
          <h2>30 extra lives recieved</h2>
        </div>
      );
    }
      return (
        <>
          <NavMenu />
          <Container tag="main" className="expandingBackground">
            <h1 className="fancyText">Welcome To The Pet Hotel!</h1>
            <p>At our Pet Hotel, we take care of your pet while you are away. </p>
            <PetsTable fetchPetOwners={this.fetchPetOwners} />
            <br />
            <PetOwnersTable fetchPetOwners={this.fetchPetOwners} />
            <Transaction />
          </Container>
        </>
      );
  }
}

export default connect()(Home);