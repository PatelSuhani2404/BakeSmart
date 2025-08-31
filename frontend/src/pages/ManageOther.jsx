import React from "react";
import ManageProduct from "../components/ManageProduct";

function ManageOther(){

    const otherFields=["name","price","image"]

    return(
        <>
        <ManageProduct title="Manage Other" category="otheritems" fields={otherFields}/>
        </>
    )
}

export default ManageOther;