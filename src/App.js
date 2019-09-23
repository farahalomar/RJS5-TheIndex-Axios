import React, { Component } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";


// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    filteredAuthors: [],
    loading: true,
  };

  selectAuthor = async author =>{ 
    this.setState({loading:true})
    try{
      const response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`);
      const currentAuthor = response.data;
      this.setState({currentAuthor : currentAuthor, loading:false});
    }
    catch(error){
      console.error("WHYYYCYGYDSGFYB???");
      console.error(error);
    }
  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

async componentDidMount(){
  this.setState({loading:true})
  try{
    const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
    const authors = response.data;
    this.setState({authors : authors});
    this.setState({filteredAuthors : authors});
    this.setState({loading : false});
  }
  catch(error){
    console.error("WHYYYCYGYDSGFYB???");
    console.error(error);
  }
}
  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">
          {this.state.loading? <LoadingScreen/>  :this.getContentView()} 
          
          </div>
        </div>
      </div>
    );
  }
}

export default App;
