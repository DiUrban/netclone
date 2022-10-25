import { useState } from "react";
import "./newProduct.css";
import storage from '../../firebase'
import { createMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from '../../context/movieContext/MovieContext'

export default function NewProduct() {
  const [movie, setMovie] = useState({});
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageSm, setImageSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [notImage, setNotImage] = useState(null);
  const [notImageTitle, setNotImageTitle] = useState(null);
  const [notImageSm, setNotImageSm] = useState(null);
  const [notVideoTrailer, setNotVideoTrailer] = useState(null);
  const [notVideo, setNotVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext)
  
  const handleChange = (e) => {
    setMovie({...movie,[e.target.name]:e.target.value})
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
            setMovie(prev => { return { ...prev, [item.label]: url }; })
          });
          setUploaded(prev => prev + 1);
        }
      )
    });
  }
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: image, label: "img"
      },
      {
        file: imageTitle, label: "imgTitle"
      },
      {
        file: imageSm, label: "imgSm"
      },
      {
        file: trailer, label: "trailer"
      },
      {
        file: video, label: "video"
      }
    ])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie,dispatch)
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie/Series</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input className={`${notImage ? "notImage" : ""}`} type="file" id="img" name="img" onChange={e => { if (e.target.files[0].type.startsWith("image")) { setImage(e.target.files[0]); setNotImage(false) } else {setNotImage(true)} }} />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input className={`${notImageTitle?"notImage":""}`} type="file" id="imgTitle" name="imgTitle" onChange={e => { if (e.target.files[0].type.startsWith("image")) { setImageTitle(e.target.files[0]); setNotImageTitle(false) } else {setNotImageTitle(true)} }}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input className={`${notImageSm?"notImage":""}`} type="file" id="imgSm" name="imgSm" onChange={e => { if (e.target.files[0].type.startsWith("image")) { setImageSm(e.target.files[0]); setNotImageSm(false) } else {setNotImageSm(true)} }}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="V for Vendetta" name="title"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Action" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="2h 12m" name="duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="number" placeholder="2005" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input type="number" placeholder="13" name="limit"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Is a Series</label>
          <select id="isSeries" name="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
          <div className="addProductItem">
          <label>Trailer</label>
          <input className={`${notVideoTrailer ? "notImage" : ""}`} type="file"  name="trailer" onChange={e => { if (e.target.files[0].type.startsWith("video")) { setTrailer(e.target.files[0]); setNotVideoTrailer(false) } else {setNotVideoTrailer(true)} }}/>
          </div>
          <div className="addProductItem">
          <label>Video</label >
          <input className={`${notVideo ? "notImage" : ""}`} type="file" name="video" onChange={e => { if (e.target.files[0].type.startsWith("video")) { setVideo(e.target.files[0]); setNotVideo(false) } else {setNotVideo(true)} }}/>
        </div>{(notImage || notImageTitle|| notImageSm|| notVideo || notVideoTrailer) ? (<button className="CantUploadButton" onClick={handleSubmit} disabled={true}>Can't Upload</button>)
                         : (uploaded===5 ? (
          
          <button className="productButton" onClick={handleSubmit}>Update</button>
        ) : (
            
          <button className="productButton" onClick={handleUpload}>Upload</button> 
                      ))}
      </form>
    </div>
  );
}
