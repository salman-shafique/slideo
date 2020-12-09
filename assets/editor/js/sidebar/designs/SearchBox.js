import React from "react";

export default function SearchBox() {


    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="fas fa-search"></i>
                </span>
            </div>
            <input type="text" className="form-control" placeholder="" />
        </div>
    )
}