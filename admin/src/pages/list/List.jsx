import {useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import "./list.css";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";

export default function List() {
  const location = useLocation();
  const list = location.state;
  const { dispatch } = useContext(ListContext)

  const [changedList, setChangedList] = useState(list);
  const handleChange = (e) => {
    const [section] = e.target.name.split(".");

    setChangedList(
        {...changedList,[section]: e.target.value} )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
      updateList(changedList, dispatch)
      window.open(`./`,"_self")
  }
  return (
    <div className="product">
      <div className="productTitleContainer">
              <h1 className="productTitle">List</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                      <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Id:</span>
                          <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                          <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Type:</span>
                          <span className="productInfoValue">{list.type}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List Title</label>
                  <input type="text" name="title" placeholder={list.title} onChange={handleChange} />
                    <label>Genre</label>
                    <input type="text" name="genre" placeholder={list.genre} onChange={handleChange} />
                    <label>Type</label>
                    <input type="text" name="limit"  placeholder={list.type} onChange={handleChange} />
              </div>
              <div className="productFormRight">
                <button className="addProductButton" onClick={handleSubmit}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
