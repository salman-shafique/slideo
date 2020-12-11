import React from "react";
import { filterDesigns } from "./filterDesigns";

export default function SearchBox() {

    const enterQuery = (e) => {
        filterDesigns(e.target.value);
    }

    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="fas fa-search"></i>
                </span>
            </div>
            <input type="text" onChange={enterQuery} className="form-control" placeholder="Try something..." />
        </div>
    )
}