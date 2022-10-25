import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react'
import './listItem.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../authContext/AuthContext'
function ListItem({ index, item }) {
  const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})
  const user = useContext(AuthContext)

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get("/movies/find/" + item, {
          headers: {
            token: `Bearer ${user.user.accessToken}`
          }
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getMovie();
  }, [item,user]);
  
  return (
    <Link to={{pathname:"/watch"}} state={movie}>
    <div className='listItem'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{left:isHovered&&index*227.5-50}}
    >
      <img src={movie.img} alt="" />
      {isHovered && (
        <>  
          <video src={movie.trailer}
            autoPlay
            loop
            muted
          />
      <div className="itemInfo">
        <div className="icons">
          <PlayArrow  className='icon'/>
          <Add  className='icon'/>
          <ThumbUpAltOutlined  className='icon'/>
          <ThumbDownAltOutlined className='icon'/>
        </div>
        <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className='limit'>{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
      </div>
      </>
        )}
      </div>
    </Link>
  )
}

export default ListItem