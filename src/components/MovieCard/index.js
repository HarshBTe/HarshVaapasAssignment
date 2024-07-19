import './index.css'

const MovieCard = props => {
  const {imgUrl} = props

  return (
    <div className="img-container">
      <img className="dog-img" src={imgUrl} alt="not found" />
    </div>
  )
}

export default MovieCard
