import React, { useContext } from "react";
import { Offer } from "../component/offerForm";
import { Context } from "../store/appContext";
import "../../styles/login.css"

export const OfferView = () => {
    const {store, actions} = useContext(Context)

    return(
        <Offer/>
    )
}
    