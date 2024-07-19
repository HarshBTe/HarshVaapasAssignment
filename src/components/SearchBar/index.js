import {Component} from 'react'
import {RotatingLines} from 'react-loader-spinner'

import './index.css'
import MovieCard from '../MovieCard'

class SearchBar extends Component {
  state = {searchInput: '', isLoading: true, imgUrlrandomDog: '', movieData: {}}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  componentDidMount() {
    this.getImgUrlData()
  }

  getImgUrlData = async () => {
    const imgresponse = await fetch('https://dog.ceo/api/breeds/image/random')
    const imgdata = await imgresponse.json()
    const retrivedImg = imgdata.message

    const movieresponse = await fetch(
      'https://openlibrary.org/search.json?q=the+lord+of+the+rings',
    )
    const moviedata = await movieresponse.json()
    const booksWithAuthors = moviedata.docs.map(book => ({
      title: book.title,
      authorName: book.author_name,
    }))

    this.setState({
      imgUrlrandomDog: retrivedImg,
      isLoading: false,
      movieData: booksWithAuthors,
    })
  }

  renderMovieDetails = () => {
    const {movieData, imgUrlrandomDog} = this.state

    return (
      <div>
        <MovieCard imgUrl={imgUrlrandomDog} />
        <p>Movie Title: {movieData[0].title}</p>
        <p>Author Name: {movieData[0].authorName}</p>
      </div>
    )
  }

  render() {
    const {searchInput, isLoading} = this.state

    return (
      <div className="main-container">
        <div className="inside-container">
          <h1> Search Movie </h1>
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              className="search-desc"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
              alt="search icon"
              className="search-img"
            />
          </div>
          {isLoading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
              className="loader-style"
            />
          ) : (
            this.renderMovieDetails()
          )}
        </div>
      </div>
    )
  }
}

export default SearchBar
