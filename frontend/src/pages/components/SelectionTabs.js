import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectionTabs = (props) => {
  return (
    <div className={"col-sm-2 "+props.popular} onClick={props.onClick}>
      <div className={"selectionTabStrokeWrapper "}>
        <div className={"selectionTab "+props.active}>
          <div className="selectionTabInner">
            <div className={"selectionTabImgWrapper "+props.subActive}>
              <img src={props.img} className="selectionTabImg" />
            </div>
            <div className="selectionTabText">{props.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionTabs;
