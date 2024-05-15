import {convert} from './converter.js';
import React, {useState, useEffect} from 'react';

function ConvertButtons() {
    return (
        <div className="conButtonDiv">
            <br></br>
            <button className="convertButtons" id="confirm">Confirm</button>
        </div>
    );
}

export default ConvertButtons