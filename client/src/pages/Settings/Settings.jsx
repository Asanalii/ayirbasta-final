import React, { useState, useEffect, useContext } from "react";

// import Barters from "components/Barters";
import BarterMenu from "components/BarterMenu";
import Header from "components/Header";
import SettingsStyled from "./Settings.styled";

import profileImg from "../../assets/img/button.png";
import imageArrow from "../../assets/img/imageArrow.svg";
import apiClient from "api/apiClient";
import { AuthContext } from "context/AuthContext";

function BartersPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [file, setFile] = useState(null);
  const { contextData } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${contextData.token}`,
          },
        });
        const userData = response.data;
        setFirstname(userData.firstname || "");
        setLastName(userData.lastname || "");
        setEmail(userData.email || "");
        setCity(userData.city || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.patch(
        "/v1/users/update",
        {
          firstname,
          lastname,
          email,
          city,
          picture: file,
        },
        {
          headers: {
            Authorization: `Bearer ${contextData.token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <SettingsStyled>
        <BarterMenu linkActive={"settings"} />
        <form className="cont" onSubmit={handleSubmit}>
          <div>
            <div className="info">
              <div>
                <h3>Profile settings</h3>
                <p>Here you can change profile inforamtion</p>
              </div>
            </div>
            <div className="settings">
              <div className="settings-main">
                <h4>First name</h4>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <h4>Last Name</h4>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <h4>Email</h4>
                <input
                  type="text"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <h4>City</h4>
                <select
                  name="City"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="" disabled selected>
                    Choose your city
                  </option>
                  <option value="New York">New York</option>
                  <option value="Pavlodar">Pavlodar</option>
                  <option value="Astana">Astana</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="London">London</option>
                  <option value="Aktau">Aktau</option>
                  <option value="Alma-Ata">Alma-Ata</option>
                  <option value="Vienna">Vienna</option>
                </select>
              </div>
              <div className="upload-pic">
                <input
                  type="file"
                  onChange={() => setFile(e.target.files[0])}
                  id="file"
                  style={{ display: "none" }}
                ></input>

                <label htmlFor="file">
                  <div className="DragText">
                    <div className="DragText Top">
                      <h3>Upload your photo</h3>
                      <img src={profileImg} alt="" />

                      <div className="dragdrop">
                        <p>
                          <span>Drag drop</span> your file here or{" "}
                          <span>Browse</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button>SAVE</button>
        </form>
      </SettingsStyled>
    </div>
  );
}

export default BartersPage;
