import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/offer.css"
import { useState } from "react";


export const Offer = () => {
    
    const {actions, store} = useContext(Context)
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !description || !requirements) {
            alert("Please fill all fields");
            return;  
        }
        actions.addOffer(title, description, requirements)
    }

    const handleCancel = () => {
        navigate("/")
    }

    return(
        <div className="form-container">
        <p className="form-title">Create an offer</p>
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-container">
                <input placeholder="Title" type="text"  onChange={(e) => setTitle(e.target.value)}  />
            </div>
            <div className="input-container">
                <input placeholder="Description" type="text"  onChange={(e) => setDescription(e.target.value)}  />
            </div>
            <div className="input-container">
                <input placeholder="Requirements" type="text"  onChange={(e) => setRequirements(e.target.value)}  />
            </div>
            <div className="buttons">
            <button className="submit-2" type="button" onClick={handleCancel}>
			Cancel
			</button>
            <button className="submit" type="submit">
			Create offer
			</button>
            </div>
        </form>
    </div>
    )
}