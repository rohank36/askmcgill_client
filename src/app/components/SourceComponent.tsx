import React, {useState} from "react";

const SourceComponent = ({ source }: { source: string }) =>{

    return(
        <div 
        className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-300 transition break-words"
        onClick={() => window.open(source, "_blank")}
        >
            <h1 className="text-sm">{source}</h1>
        </div>
    );
};

export default SourceComponent;