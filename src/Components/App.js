import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    searchPage: 1
  }

  componentDidMount = () => {
    this.refs.iScroll.addEventListener("scroll", () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight
      ) {
        this.handleScroll()
      }
    })
    Adapter.getShows(this.state.searchPage)
    .then(shows => this.setState({
      shows,
      searchPage: this.state.searchPage + 1
    }))
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleScroll = () => {
    Adapter.getShows(this.state.searchPage)
    .then(shows => this.setState({
      shows: [...this.state.shows, shows],
      searchPage: this.state.searchPage + 1
    }))
  }


  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating: "" }) : this.setState({ filterByRating: e.target.value})
  }

  selectShow = (show) => {
    if (this.state.selectedShow === show) {
      this.setState({selectedShow: ""})
    } else {
      Adapter.getShowEpisodes(show.id)
      .then((episodes) => {
        this.setState({
        selectedShow: show,
        episodes
      })})
    }
  }

  displayShows = () => {
    if (this.state.filterByRating) {
      return this.state.shows.filter((s)=> {
        return s.rating.average >= parseInt(this.state.filterByRating, 10)
      })
    } else {
      return this.state.shows
    }
  }

  render (){
    return (
      <div ref="iScroll" style={{height: "5000px" ,overflow: "auto"}}>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
