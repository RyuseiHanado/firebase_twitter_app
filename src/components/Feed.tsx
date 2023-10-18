import React from "react";
import {auth} from "../firebase"
import {Button} from "@material-ui/core";

const Feed = () => {
    return(<div>
        <Button
            onClick={()=>auth.signOut()}
        >
        logout
        </Button>
    </div>)
}

export default Feed