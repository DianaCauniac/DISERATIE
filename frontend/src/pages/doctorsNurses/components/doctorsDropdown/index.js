import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allDoctors,
  allDoctorsByNurse,
} from "../../../../redux/actions/userActions";
import "./doctorsDropdown.css";
// import { productOptionsConstants } from "../../../../../../redux/constants";
import { userConstants } from "../../../../redux/constants";
const { SELECTED_DOCTOR } = userConstants;
// import { colorConstants } from "../../../../../../colors";
// const { PRODUCT_POPUP_Items_BG } = colorConstants;
// const { SELECTED_STUDIO } = productOptionsConstants;

const DoctorsDropdown = () => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleDropdownOpening = () => {
    setOpenDropdown((prev) => !prev);
  };

  // useEffect(() => {
  //   dispatch(allDoctors());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (_User.profile.role === "nurse") {
      dispatch(allDoctorsByNurse(_User.profile._id));
    } else {
      dispatch(allDoctors());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.selectedDoctor]);

  const handleDoctorSelect = (doctor) => {
    dispatch({
      type: SELECTED_DOCTOR,
      payload: doctor,
    });
    setOpenDropdown(false);
  };

  // const shouldShowSellerInList = () => {
  //   for (let i = 0; i < _productOptions.products.length; i++) {}
  // };

  return (
    <div
      className="studio-dropdown"
      // style={{ background: PRODUCT_POPUP_Items_BG, display: "inline-block" }}
    >
      <h4 onClick={() => handleDropdownOpening()}>
        {_User.selectedDoctor ? _User.selectedDoctor?.name : "Selecteaza un doctor"}
      </h4>
      <i className="ri-arrow-drop-down-fill"></i>
      {openDropdown ? (
        <ul
        // style={{ background: PRODUCT_POPUP_Items_BG }}
        >
          <li
            style={{
              fontSize: "18px",
              color: "#ccc",
              // background: PRODUCT_POPUP_Items_BG,
            }}
            onClick={() => setOpenDropdown(false)}
          >
            {" "}
            Selecteaza un doctor{" "}
          </li>
          {/* {_productOptions.studios.map((item, i) => ( */}
          {_User.allDoctors.map((item, i) => (
            <li
              // style={{ background: PRODUCT_POPUP_Items_BG }}
              onClick={() => handleDoctorSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DoctorsDropdown;
