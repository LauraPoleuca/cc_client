
const TextInputWithSubmit = ({handleSubmit, codeRef}) => {
    //const textRef = useRef(null);

    // const handleSubmit = async (event) => {
	// 	// come back be here
    //     event.preventDefault();
    // };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    ref={codeRef}
                    placeholder="Enter your code here..."
                    rows="30"
                    cols="70"
                ></textarea>
                <br />
                <button type="Submit">Submit</button>
            </form>
        </div>
    );
};

export default TextInputWithSubmit;
