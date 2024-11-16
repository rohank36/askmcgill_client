import React, {useState} from "react";

const SourceComponent = ({ source }: { source: string }) =>{

    return(
        <div 
        className="border-2 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-300 transition"
        onClick={() => window.open(source, "_blank")}
        >
            <h1>{source}</h1>
        </div>
    );
};

export default SourceComponent;