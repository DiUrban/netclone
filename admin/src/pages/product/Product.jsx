import {useLocation } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import storage from '../../firebase'
import { updateMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from '../../context/movieContext/MovieContext'
import "./product.css";

export default function Product() {
    const location = useLocation();
    const movie = location.state;
    const [changedMovie, setChangedMovie] = useState(movie);
    const [image, setImage] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [notImage, setNotImage] = useState(null);
    const [notVideoTrailer, setNotVideoTrailer] = useState(null);
    const [notVideo, setNotVideo] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const { dispatch } = useContext(MovieContext)
    console.log(location)
    const handleChange = (e) => {
        const [section] = e.target.name.split(".");

        setChangedMovie(
            {...changedMovie,[section]: e.target.value} )
      }
      const upload = (items) => {
        items.forEach(item => {
          const uploadTask = storage.ref(`/items/${item.file.name}`).put(item.file);
          uploadTask.on("state_changes", snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% Finished`);
          },
            (err) => { console.log(err) }, () => {
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                setChangedMovie(prev => { return { ...prev, [item.label]: url }; })
              });
              setUploaded(prev => prev + 1);
            }
          )
        });
        setUploaded(true)
      }
      const handleUpload = (e) => {
          e.preventDefault();
          let array=[]
          image && array.push({ file: image, label: "img" });
          trailer && array.push({ file: trailer, label: "trailer" })
          video && array.push({ file: video, label: "video" })
          upload(array)
      }
      const handleSubmit = (e) => {
        e.preventDefault();
          updateMovie(changedMovie, dispatch)
          window.open(`./`,"_self")
      }
  return (
    <div className="product">
      <div className="productTitleContainer">
              <h1 className="productTitle">{movie.isSeries ? "Series" : "Movie"}</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                      <img src={movie.img} alt="Movie Poster" className="productInfoImg" />
                      <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Id:</span>
                          <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                          <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Year:</span>
                          <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Age Limit:</span>
                          <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>{movie.isSeries ? "Series" : "Movie"} Name</label>
                  <input type="text" name="title" placeholder={movie.title} onChange={handleChange} />
                      <label>Year</label>
                      <input type="number" name="year" placeholder={movie.year} onChange={handleChange}/>
                      <label>Duration</label>
                      <input type="text" placeholder={movie.duration} name="duration" onChange={handleChange}/>
                      <label>Genre</label>
                      <input type="text" name="genre" placeholder={movie.genre} onChange={handleChange}/>
                      <label>Description</label>
                      <input type="text" name="desc" placeholder={movie.desc} onChange={handleChange}/>
                      <label>Age Limit</label>
                      <input type="number" name="limit"  placeholder={movie.limit} onChange={handleChange}/>
                      <label>Trailer Link</label>
                      <input type="file"  className={`${notVideoTrailer ? "notImage" : ""}`} onChange={e => { if (e.target.files[0].type.startsWith("video")) { setTrailer(e.target.files[0]); setNotVideoTrailer(false) } else {setNotVideoTrailer(true)} }}/>
                      <label>{movie.isSeries ? "Series" : "Movie"} Link</label>
                      <input type="file" className={`${notVideo ? "notImage" : ""}`} onChange={e => { if (e.target.files[0].type.startsWith("video")) { setVideo(e.target.files[0]); setNotVideo(false) } else {setNotVideo(true)} }}/>
              </div>
              <div className="productFormRight">
                  <div className={`${notImage ? "notImage" : ""} productUpload`} >
                          <img src={image ? changedMovie.img :  movie.img } alt="" className="productUploadImg" />
                      <label for="img">
                          <Publish className={`${notImage ? "notImage" : ""} publishIcon`}/>
                      </label>
                      <input type="file" id="img" name="img" style={{display:"none"}} onChange={e => { if (e.target.files[0].type.startsWith("image")) { setImage(e.target.files[0]); setNotImage(false) } else {setNotImage(true)} }} />
                  </div>
                      {(notImage || notVideo || notVideoTrailer) ? (<button className="CantUploadButton" onClick={handleSubmit} disabled={true}>Can't Upload</button>)
                         : (uploaded ? (
          
          <button className="addProductButton" onClick={handleSubmit}>Update</button>
        ) : (
            
          <button className="addProductButton" onClick={handleUpload}>Upload</button> 
                      ))}

              </div>
          </form>
      </div>
    </div>
  );
}
