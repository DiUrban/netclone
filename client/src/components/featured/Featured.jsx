import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import './featured.scss'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../authContext/AuthContext'

function Featured({ type, setGenre }) {
    const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})
    const user = useContext(AuthContext)
    const [content, setContent] = useState({});
    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axiosInstance.get(`/movies/random${type ? "?type=" + type : ""}`, {
                    headers:{token:`Bearer ${user.user.accessToken}`}
                  })
                setContent(res.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        getRandomContent();
    },[type,user])
    return (
        <div className='featured'>
            {type && (
                <div className="category">
                    <span>{type === "movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
                        <option value="Genre">Genre</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Drama">Drama</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci">Sci-fi</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Western">Western</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="Featured content" />
            <div className="info">
                <img src={content.imgTitle} alt="Title" />
                <span className="desc">
                    {content.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
      </div>
    )
}

export default Featured