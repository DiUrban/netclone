import {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newList.css";
import { createList } from "../../context/listContext/apiCalls";
import { useContext } from "react";
import { ListContext } from '../../context/listContext/ListContext'
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";

export default function NewList() {
  const [list, setList] = useState({});
  const navigate=useNavigate()
  const { dispatch } = useContext(ListContext)
  const { movies, dispatch: dipatchMovie } = useContext(MovieContext)
  useEffect(() => {
    getMovies(dipatchMovie)
  }, [dipatchMovie]);
  const handleChange = (e) => {
    setList({...list,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch)
    navigate("/list")
  }
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({...list,[e.target.name]:value})
  }
console.log(list)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">

        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Action Movies" name="title"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Action" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Type:</label>
          <select name="type" onChange={handleChange}>
            <option>Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        </div>
        <div className="formRight">

        <div className="addProductItem">
          <label>Content:</label>
          <select multiple name="content" onChange={handleSelect} style={{height:'205px'}}>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))}
          </select>
        </div>
              </div>
          <button className="productButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
