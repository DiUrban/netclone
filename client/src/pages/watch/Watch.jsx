import { ArrowBackIosOutlined } from '@material-ui/icons'
import './watch.scss'
import {useLocation, useNavigate} from 'react-router-dom'
function Watch() {
  const navigate = useNavigate();
  const location = useLocation()
  const movie = location.state;
  console.log(movie)
  return (
      <div className='watch'>
          <div className="back" onClick={() => navigate(-1)}>
              <ArrowBackIosOutlined />
              Home
          </div>
          <video
              className='video'
              autoPlay
              progress
              controls
              full
              src={movie.video}
          />
    </div>
  )
}

export default Watch