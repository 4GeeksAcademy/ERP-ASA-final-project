import React, { useContext, useEffect } from "react";
import { Offer } from "../component/offerForm";
import { Context } from "../store/appContext";
import "../../styles/login.css"

export const OfferView = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.resetEmployeeData()
        console.log(store.employeeData);
    }, [])

    return (
        <div className="pb-5">
            <Offer />
        </div>
    )
}
