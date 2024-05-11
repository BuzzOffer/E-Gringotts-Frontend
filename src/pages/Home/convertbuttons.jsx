import {convert} from './converter.js';

function ConvertButtons() {
    return (
        <div className="conButtonDiv">
            <br></br>
            <button className="convertButtons" id="convert" onClick={convert}>Convert</button>
            <button className="convertButtons" id="confirm">Confirm</button>
        </div>
    );
}

export default ConvertButtons