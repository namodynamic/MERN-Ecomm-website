import React from "react";
import { useLocation } from "react-router-dom";

const Color = (props) => {
  const { colorData, setColor } = props;
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => {
            return (
              <li
                onClick={() => setColor(item?._id)}
                style={{ backgroundColor: item?.title }}
                key={index}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
