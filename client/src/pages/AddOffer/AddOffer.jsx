import React, { useContext, useRef } from "react";
import { useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

import BarterMenu from "components/BarterMenu";
import Header from "components/Header";
import AddOfferStyled from "./AddOffer.styled";

import apiClient from "api/apiClient";

const AddOffer = () => {
  const { contextData } = useContext(AuthContext);

  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  // const [productsTrade, setPRODUCTTrade] = useState("");

  const selectFile = (e) => {
    setImage(e.target.files[0]);
  };

  const fileRef = useRef();
  const modalContentRef = useRef(null);

  const clearFile = () => {
    fileRef.current.value = "";
  };

  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [document, setDocument] = useState("");

  const chooseFile = (attach) => {
    setFileName(attach.name);
    if (!["image/png", "image/jpeg"].includes(attach.type)) {
      setError({ status: "error", message: "Неверный формат текста" });
      return;
    }
    if (attach.size > 500000000) {
      setError({
        status: "error",
        message: "Размер файла не должен превышать 5 МБ",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (file) => {
      setDocument(`${window.btoa(file.target.result)}`);
      setError({ status: "", message: "" });
    };
    reader.readAsBinaryString(attach);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("images", image);

    apiClient
      .post("/v1/items", formData, {
        headers: {
          Authorization: `Bearer ${contextData.token}`,
        },
      })
      .then((response) => {
        navigate("/items");
      });
  };

  return (
    <>
      <Header />
      <AddOfferStyled>
        <BarterMenu linkActive="offers" />

        <form className="cont" onSubmit={handleSubmit}>
          <div className="offer">
            <div className="info">
              <div>
                <h3>Item Info</h3>
                <p>Please enter your item info</p>
              </div>
            </div>
            <div className="offer-product">
              <div className="product-info">
                <div>
                  <h4>Category</h4>
                  <select
                    name="Category"
                    id="category"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Choose category
                    </option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Sports">Sports</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Music">Music</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <h4>Item name</h4>
                  <input
                    type="text"
                    placeholder={"Item name"}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <h4>Description</h4>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>

                <h4>Image</h4>
                <input
                  name="image"
                  id="image"
                  placeholder="Link image"
                  type="file"
                  onChange={(event) => selectFile(event)}
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </div>

          <button>ADD OFFER</button>
        </form>
      </AddOfferStyled>
    </>
  );
};

export default AddOffer;
