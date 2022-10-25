import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { useState,useRef} from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'

function List({list}) {
    const [isMoved, setIsMoved] = useState(false)
    const [slideNumber,setSlideNumber]=useState(0)
    const clickLimit = useState(window.innerWidth / 230)
    const listRef=useRef()
    const handleClick = (direction) => {
        setIsMoved(true)
        let distance=listRef.current.getBoundingClientRect().x-50
        if (direction === "left"&&slideNumber>= 1) {
            listRef.current.style.transform = `translateX(${distance + 230}px)`
            setSlideNumber(slideNumber-1)
        } else if (direction === "right" &&slideNumber<= list.content.length-clickLimit) {
            listRef.current.style.transform = `translateX(${distance - 230}px)`
            setSlideNumber(slideNumber+1)
        }
    }
  return (
      <div className='list'>
          <span className="listTitle" >
              {list.title}
          </span>
          <div className="wrapper" >
              <ArrowBackIosOutlined
                  className='sliderArrow left'
                  onClick={() => handleClick("left")}
                  style={{display:!isMoved&&"none"}}
              />
              <div className="container" ref={listRef}>
                  {list.content.map((item,i) => (
                      <ListItem index={i} item={item} />
                  ))}
              </div>
              <ArrowForwardIosOutlined
                  className='sliderArrow right'
                  onClick={() => handleClick("right")}
              />
          </div>
    </div>
  )
}

export default List