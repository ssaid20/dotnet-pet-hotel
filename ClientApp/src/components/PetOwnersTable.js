import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PetOwnersTable extends Component {
  state = {
    errors: [],
    successMessage: null,
    loading: true,
    newPetOwner: {
      name: "",
      email: "",
      editingPetOwnerId: null,
      updatedPetOwnerDetails: {
        newName: "",
        newEmail: "",
      },
    },
  };

  //edit pet function
  startEditingPetOwner = (petOwner) => {
    this.setState({
      editingPetOwnerId: petOwner.id,
      updatedPetOwnerDetails: {
        newName: petOwner.name,
        newEmail: petOwner.email,
      },
    });
  };
  
  // startEditing = (petOwner) => {
    
  //   this.setState({
  //     editingPetOwnerId: petOwner.id,
  //     updatedPetDetails: { //setting default on update to original values
  //       newName: petOwner.name,
  //     newEmail: petOwner.email
  //     }
  //   });   
  // };

  componentDidMount = async () => {
    await this.props.fetchPetOwners();
    this.setState({ loading: false });
  };

  renderMessages = () => {
    /*
           Look into the local state to see if we have any errors
           that are derived from the backend validation, and display them
        */
    const errors = [];
    if (this.state.errors) {
      for (let err in this.state.errors) {
        errors.push(<li>{this.state.errors[err]}</li>);
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

  renderTable = () => {
    return (
      
      <div className="table-responsive">
        <ToastContainer />
        
        <table
          className="table table-striped table-bordered table-hover"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Pets</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.petOwners.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  There are no registered pet owners.
                </td>
              </tr>
            )}
            {this.props.petOwners.map((petOwner) => (
              <>
              <tr key={`petOwner-row-${petOwner.id}`}>
                <td>{petOwner.id}</td>
                <td>{petOwner.name}</td>
                <td>{petOwner.email}</td>
                <td>{petOwner.petCount}</td>
                <td>
                  
                  <button
                    onClick={() => this.deletePetOwner(petOwner.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.startEditingPetOwner(petOwner)}
                    className="btn btn-sm btn-warning ml-1 mr-1"
                  >
                  Update
                </button>
                </td>
              </tr>
                
                {this.state.editingPetOwnerId === petOwner.id ? (
                <tr>
                  <td colSpan="5">
                    {this.renderUpdatePetOwnerForm(petOwner)}
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

  renderUpdatePetOwnerForm = (petOwner) => {
    return (
      <div>
        <input
          placeholder="Pet Owner Name"
          value={this.state.updatedPetOwnerDetails.newName}
          onChange={(event) =>
            this.setState({
              updatedPetOwnerDetails: {
                ...this.state.updatedPetOwnerDetails,
                newName: event.target.value,
              },
            })
          }
        />
        <input
          placeholder="Email Address"
          value={this.state.updatedPetOwnerDetails.newEmail}
          onChange={(event) =>
            this.setState({
              updatedPetOwnerDetails: {
                ...this.state.updatedPetOwnerDetails,
                newEmail: event.target.value,
              },
            })
          }
        />
        <button onClick={this.updatePetOwner}>Save Changes</button>
        <button onClick={() => this.setState({ editingPetOwnerId: null })}>
          Cancel
        </button>
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
        <h2 id="tableLabel">Pet Owners</h2>
        {this.renderMessages()}
        <div className="form-group row ml-0">
          <input
            placeholder="Pet Owner Name"
            value={this.state.newPetOwner.name}
            onChange={(event) =>
              this.setState({
                newPetOwner: {
                  ...this.state.newPetOwner,
                  name: event.target.value,
                },
              })
            }
            className={"form-control col-md-3 mr-2"}
          />
          <input
            placeholder="Email Address"
            value={this.state.newPetOwner.email}
            onChange={(event) =>
              this.setState({
                newPetOwner: {
                  ...this.state.newPetOwner,
                  email: event.target.value,
                },
              })
            }
            className={"form-control col-md-3 mr-2"}
          />
          <button
            onClick={this.submitPetOwner}
            className={"btn btn-primary col-md-2"}
          >
            Add Pet Owner
          </button>
        </div>
        {contents}
      </>
    );
  }


  deletePetOwner = async (id) => {
     // Prompt the user for confirmation before deleting
     const userConfirmed = window.confirm("Are you sure you want to delete this pet owner?");
     if (!userConfirmed) {
      return;
  }
    // First, find the pet owner by id from the props
    const petOwner = this.props.petOwners.find(po => po.id === id);
    
    // If the petOwner has a petCount greater than zero, prevent deletion
    if (petOwner && petOwner.petCount > 0) {
        toast.error("Cannot delete a pet owner with checked-in pets!");
        return;
    }

    try {
        await axios.delete(`api/petOwners/${id}`);
        this.props.fetchPetOwners();
        toast.success("Deleted pet owner successfully");
    } catch (error) {
        toast.error("Error deleting the pet owner!");
    }
};

//update owner
updatePetOwner = async () => {
  const { newName, newEmail } = this.state.updatedPetOwnerDetails;

  try {
    const updatedPetOwner = {
      name: newName,
      email: newEmail,
    };

    await axios.put(`api/petOwners/${this.state.editingPetOwnerId}`, updatedPetOwner);
    this.props.fetchPetOwners();
    toast.success("Successfully Updated Pet Owner!");
    this.setState({ editingPetOwnerId: null, updatedPetOwnerDetails: {} }); // Reset editing state
  } catch (err) {
    toast.error("Update Failed: " + err.message);
  }
};


  submitPetOwner = async () => {
    try {
      console.log(this.state.newPetOwner);
      await axios.post("api/petOwners", this.state.newPetOwner);
      this.setState({ newPetOwner: { ...this.state.newPetOwner, name: "" } });
      this.props.fetchPetOwners();
      toast.success("Successfully added Pet Owner");
      // this.setState({
      //   errors: [],
      //   successMessage: "Successfully added pet Owner",
      // });
    } catch (err) {
      if (err.response.status === 400) {
        // validation errors
        this.setState({
          errors: err.response.data.errors,
          successMessage: null,
        });
      }
    }
  };
}

const mapStateToProps = (state) => ({ petOwners: state.petOwners });
export default connect(mapStateToProps)(PetOwnersTable);
