class Adapter {
  static getShows (page){
    return fetch(`http://api.tvmaze.com/shows?page=${page}`)
    .then(res => res.json())
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json())
  }
}

export default Adapter
