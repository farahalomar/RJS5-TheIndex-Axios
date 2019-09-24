import React, {Component} from "react";
import Silver from "./Silver.gif";
class LoadingScreen extends Component{
render(){
    return(
        <div> 
        <img src={Silver} style={{width:"1100px"}}></img>
        </div>
    )
}
}

export default LoadingScreen;

