function ConvertButtons({ handleConversion }) {
    return (
        <div className="conButtonDiv">
            <br></br>
            <button className="convertButtons" id="confirm" onClick={handleConversion}>Confirm</button>
        </div>
    );
}

export default ConvertButtons