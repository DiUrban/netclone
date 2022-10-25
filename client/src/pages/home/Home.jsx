import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../authContext/AuthContext'
const Home = ({ type }) => {
  const user = useContext(AuthContext)
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null)
  const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers:{token:`Bearer ${user.user.accessToken}`}
        })
        setLists(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getRandomLists();
  },[type,genre,user])
  return (
      <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list}/>
      ))}
    </div>
  )
}

export default Home