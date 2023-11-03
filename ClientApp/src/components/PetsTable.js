import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class PetsTable extends Component {
  state = {
    loading: true,
    errors: [],
    successMessage: null,
    newPet: {  //setting pet details for the new pet add
      name: "",
      petBreed: "",
      petColor: "",
      petOwnerId: "",
      imageUrl: "",
      editingPetId: null,
  updatedPetDetails: { //setting our new pet details
    newName: "",
    newPetBreed: "",
    newPetColor: "",
    newPetOwnerId: "",
    newImageUrl: "",
  }

    },
  };
  //edit pet function
  startEditing = (pet) => {
    
    this.setState({
      editingPetId: pet.id,
      updatedPetDetails: { //setting default on update to original values
        newName: pet.name,
      newPetBreed: pet.petBreed,
      newPetColor: pet.petColor,
      newPetOwnerId: pet.petOwner.id.toString(),
      newImageUrl: pet.imageUrl
      }
    });   
  };
  

  componentDidMount = () => {
    this.fetchData();
  };

  //displaying DB data
  renderTable = () => {
    return (
      <div className="table-responsive">
        <table
          className="table table-striped table-bordered table-hover"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>

            <th>Picture</th>
            <th>Name</th>
              <th>Breed</th>
              <th>Color</th>
              <th>Checked In</th>
              <th>Pet Owner</th>
              <th>Actions</th>
             
            </tr>
          </thead>
          <tbody>

          {this.props.pets.map((pet) => (
  <>
    <tr key={`pet-row-${pet.id}`}>
      <td>
        <img
          src={pet.imageUrl}
          alt={pet.name}
          width="50"
          height="50"
        />
      </td>
      <td>{pet.name}</td>
      <td>{pet.petBreed}</td>
      <td>{pet.petColor}</td>
      <td>
        {pet.checkedInAt !== "0001-01-01T00:00:00"
          ? moment.utc(pet.checkedInAt).local().calendar()
          : "Not Checked In"}
      </td>
      <td>{pet.petOwner.name}</td>
      <td className="buttons-column">
        
        {pet.checkedInAt !== "0001-01-01T00:00:00" ? (
          <button
            onClick={() => this.checkOut(pet.id)}
            className="btn btn-sm btn-info ml-1 mr-1"
          >
            Check out
          </button>
        ) : (
          <button
            onClick={() => this.checkIn(pet.id)}
            className="btn btn-sm btn-info ml-1 mr-1"
          >
            Check in
          </button>
        )}
        <button
          onClick={() => this.delete(pet.id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
        <button
  onClick={() => this.startEditing(pet)}
  className="btn btn-sm btn-warning ml-1 mr-1"
>
  Update
</button>
      </td>
    </tr>
    {this.state.editingPetId === pet.id ? (
      <tr>
        <td colSpan="7">
          {this.renderUpdateForm(pet)}
        </td>
      </tr>
    ) : null}
  </>
))}

          </tbody>
        </table>
      </div>
    );
  };
 // function to add a new pet
  addPet = async () => {
    try {
      await axios.post("api/pets/", this.state.newPet);
      this.setState({ newPet: { ...this.state.newPet, 
      name: "", 
      petBreed: "",
      petColor: "",
      petOwnerId: "",
      imageUrl: "", 
      editingPetId: null
    } })
      
      this.fetchData();
      toast.success("Successfully added pet!");
 
    } catch (err) {
      console.log(err);
        if (err.response.status === 400) {
         //validation errors
         
         toast.error(err.message);
    
        };
        
      }
    
  
  };
 //renders error messages from backend
  renderMessages = () => {
    /*
         Look into the local state to see if we have any errors
         that are derived from the backend validation, and display them
      */
    const errors = [];
    if (this.state.errors) {
      for (let err in this.state.errors) {
        // check for special case errors for human readability
        // .NET throws a weird validation error for database foreign key
        // violations starting with $. for the field name... weird.
        if (err === "$.petOwnerId") {
          errors.push(<li>Invalid Pet Owner ID</li>);
        } else {
          errors.push(<li>{this.state.errors[err]}</li>);
        }
      }
    }

    if (errors.length > 0) {
      return (
        <div className={"alert alert-danger"}>
          <p>The following errors prevented a successful save:</p>
          <ul>{errors}</ul>
        </div>
      );
    }

    if (this.state.successMessage !== null) {
      return (
        <p className={"alert alert-success"}>{this.state.successMessage}</p>
      );
    }

    return null;
  };
  // displaying new form to update pet info
  renderUpdateForm = (pet) => {
    console.log(pet.id);
    return (
      <div>
        <div className="form-group row ml-0 mr-0">
          <input
              placeholder={"Pet Image URL"}
              className={"form-control col-md-2 mr-2"}
              value={this.state.updatedPetDetails.newImageUrl}
              onChange={(e) =>
                this.setState({
                  updatedPetDetails: { ...this.state.updatedPetDetails, newImageUrl: e.target.value },
                })
              }
            />

          <input
              placeholder={"pet name"}
              className={"form-control col-md-2 mr-2"}
              value={this.state.updatedPetDetails.newName}
              onChange={(e) =>
                this.setState({
                  updatedPetDetails: { ...this.state.updatedPetDetails, newName: e.target.value },
                })
              }
          />
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.updatedPetDetails.newPetBreed}
            onChange={(e) =>
              this.setState({
                updatedPetDetails: { ...this.state.updatedPetDetails, newPetBreed: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Pet Breed
            </option>
            <option value="Shepherd">Shepherd</option>
            <option value="Poodle">Poodle</option>
            <option value="Beagle">Beagle</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Terrier">Terrier</option>
            <option value="Boxer">Boxer</option>
            <option value="Labrador">Labrador</option>
            <option value="Retriever">Retriever</option>
          </select>
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.updatedPetDetails.newPetColor}
        onChange={(e) =>
          this.setState({
            updatedPetDetails: { ...this.state.updatedPetDetails, newPetColor: e.target.value },
          })
            }
          >
            <option value="" disabled>
              Pet Color
            </option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Brown">Brown</option>
            <option value="Golden">Golden</option>
            <option value="Tricolor">Tricolor</option>
            <option value="Spotted">Spotted</option>
          </select>
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.updatedPetDetails.newPetOwnerId}
        onChange={(e) =>
          this.setState({
            updatedPetDetails: {
              ...this.state.updatedPetDetails,
              newPetOwnerId: e.target.value,
            },
          })
            }
          >
            <option>Pet Owner</option>
            {this.props.petOwners.map((petOwner) => (
              <option
                value={petOwner.id}
                key={`select-petOwner=${petOwner.id}`}
              >
                {petOwner.name}
              </option>
            ))}
          </select>
        <button onClick={this.update}>Save Changes</button>
        <button onClick={() => this.setState({ editingPetId: null })}>Cancel</button>
      </div>
      </div>
    );
  };
  

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderTable()
    );

    return (
      <>
      <ToastContainer />
        <h2 id="tableLabel">Pets</h2>
        {this.renderMessages()}
        <div className="form-group row ml-0 mr-0">
          <input
            placeholder={"Pet Image URL"}
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.imageUrl}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, imageUrl: e.target.value },
              })
            }
          />
          <input
            placeholder={"pet name"}
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.name}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, name: e.target.value },
              })
            }
          />
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.petBreed}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, petBreed: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Pet Breed
            </option>
            <option value="Shepherd">Shepherd</option>
            <option value="Poodle">Poodle</option>
            <option value="Beagle">Beagle</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Terrier">Terrier</option>
            <option value="Boxer">Boxer</option>
            <option value="Labrador">Labrador</option>
            <option value="Retriever">Retriever</option>
          </select>
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.petColor}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, petColor: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Pet Color
            </option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Brown">Brown</option>
            <option value="Golden">Golden</option>
            <option value="Tricolor">Tricolor</option>
            <option value="Spotted">Spotted</option>
          </select>
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.petOwnerId}
            onChange={(e) =>
              this.setState({
                newPet: {
                  ...this.state.newPet,
                  petOwnerId: Number(e.target.value),
                },
              })
            }
          >
            <option>Pet Owner</option>
            {this.props.petOwners.map((petOwner) => (
              <option
                value={petOwner.id}
                key={`select-petOwner=${petOwner.id}`}
              >
                {petOwner.name}
              </option>
            ))}
          </select>
          <button
            className={"form-control btn btn-primary col-md-2"}
            onClick={this.addPet}
          >
            Add Pet
          </button>
        </div>
        {contents}
      </>
    );
  }
  // delete a pet
  delete = async (id) => {

    const userConfirmed = window.confirm("Are you sure you want to delete this pet?");
     if (!userConfirmed) {
      return;
  }

    try {
      await axios.delete(`api/pets/${id}`);
      this.fetchData();
      toast.success("Successfully Deleted Pet!");

    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };
 // update pet info
update = async () => {
  const { newName, newImageUrl, newPetBreed, newPetColor, newPetOwnerId } = this.state.updatedPetDetails;

  try {
    const updatedPet = {
      name: newName,
      imageUrl: newImageUrl,
      petBreed: newPetBreed,
      petColor: newPetColor,
      petOwnerId: newPetOwnerId
    };

    await axios.put(`api/pets/${this.state.editingPetId}`, updatedPet);

    this.fetchData();
    toast.success("Successfully Updated Pet!");
    this.setState({ editingPetId: null, updatedPetDetails: {} }); // Reset editing state
  } catch (err) {
    toast.error("Update Failed: " + err.message);
    this.setState({ errors: { error: [err.message] }, successMessage: null });
  }
};

  
  //check in a pet in DB
  checkIn = async (id) => {
    try {
      await axios.put(`api/pets/${id}/checkin`);
      toast.success("Successfully checkin in!")
      // this.setState({
      //   errors: [],
      //   successMessage: "Successfully checked in!",
      // });
      this.fetchData();
    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };
  // checkout a pet in DB
  checkOut = async (id) => {
    try {
      await axios.put(`api/pets/${id}/checkout`);
      toast.success("Successfully checked out!")
      // this.setState({
      //   errors: [],
      //   successMessage: "Successfully checked out!",
      // });
      this.fetchData();
    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };
  // getting the pet data from DB
  fetchData = async () => {
    try {
      const response = await axios.get("api/pets/");
      this.props.dispatch({ type: "SET_PETS", payload: response.data });
      this.props.fetchPetOwners();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };
}

const mapStateToProps = (state) => ({
  pets: state.pets,
  petOwners: state.petOwners,
});
export default connect(mapStateToProps)(PetsTable);
