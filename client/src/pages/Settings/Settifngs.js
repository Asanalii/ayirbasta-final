// import React from "react";

// // import Barters from "components/Barters";
// import BarterMenu from "components/BarterMenu";
// import Header from "components/Header";

// import profileImg from "../../assets/img/button.png";
// import imageArrow from "../../assets/img/imageArrow.svg";

// import "./Settings.scss";

// function BartersPage() {
//   return (
//     <div>
//       <Header />
//       <div style={{ display: "flex" }}>
//         <BarterMenu linkActive={"settings"} />
//         <div className="settings-profile-card">
//           <div className="settings-profile-content">
//             <div className="settings-profile-header">
//               <h3 className="settings-profile-header-title">
//                 Profile settings
//               </h3>
//               <h4 className="settings-profile-header-subtitle">
//                 Here you can change profile inforamtion
//               </h4>
//             </div>
//             <div className="settings-profile-fileds-photo">
//               <div className="settings-profile-fileds">
//                 <form>
//                   <div className="settings-profile-fileds-input-group">
//                     <label for="first">First Name</label>
//                     <input
//                       type="text"
//                       id="first"
//                       className="settings-profile-fileds-input"
//                       name="first"
//                       placeholder="Product name"
//                     />
//                   </div>
//                   <div className="settings-profile-fileds-input-group">
//                     <label for="last">Last Name</label>
//                     <input
//                       type="text"
//                       id="last"
//                       className="settings-profile-fileds-input"
//                       name="last"
//                       placeholder="Product name"
//                     />
//                   </div>
//                   <div className="settings-profile-fileds-input-group">
//                     <label for="email">Email</label>
//                     <input
//                       type="text"
//                       id="email"
//                       className="settings-profile-fileds-input"
//                       name="email"
//                       placeholder="Product name"
//                     />
//                   </div>
//                   <div className="settings-profile-fileds-input-group select-box">
//                     <label for="city">City</label>
//                     {/* <div className="dropdown-arrow">
//                   <svg
//                     width="12"
//                     height="7"
//                     viewBox="0 0 12 7"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M6 6C5.59619 6 5.19239 5.84298 4.88665 5.53475L1.12547 1.74295C0.958177 1.57429 0.958177 1.29514 1.12547 1.12649C1.29276 0.957837 1.56966 0.957837 1.73695 1.12649L5.49813 4.91829C5.77502 5.19744 6.22498 5.19744 6.50187 4.91829L10.2631 1.12649C10.4303 0.957837 10.7072 0.957837 10.8745 1.12649C11.0418 1.29514 11.0418 1.57429 10.8745 1.74295L7.11335 5.53475C6.80761 5.84298 6.40381 6 6 6Z"
//                       fill="#90A3BF"
//                       stroke="#90A3BF"
//                       stroke-width="0.5"
//                     />
//                   </svg>
//                 </div> */}
//                     <select
//                       style={{ backgroundImage: `url(${imageArrow})` }}
//                       className="settings-profile-fileds-input select-arrow"
//                       id="city"
//                       name="city"
//                     >
//                       <option value="" disabled selected>
//                         Choose city
//                       </option>
//                       <option>New York</option>
//                       <option>Pavlodar</option>
//                       <option>Astana</option>
//                     </select>
//                   </div>

//                   <button>123</button>
//                 </form>
//               </div>
//               <div className="settings-profile-photo">
//                 <p className="settings-profile-photo-title">
//                   Upload Your Photo Here
//                 </p>
//                 <img
//                   src={profileImg}
//                   className="settings-profile-photo-image"
//                 />
//                 <div className="settings-profile-photo-drag-drop">
//                   <p className="settings-profile-photo-text">
//                     <span className="settings-profile-link">Drag drop</span>{" "}
//                     your photo here or{" "}
//                     <span className="settings-profile-link">Browse</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BartersPage;
