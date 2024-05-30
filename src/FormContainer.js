import LanguageSelector from "./LanguageSelector";
import TextInputWithSubmit from "./TextInputWithSubmit";
import axios from "axios"

const FormContainer = ({ setSelectedLanguage, selectedProblem, selectedLanguage, codeRef}) => {

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleSubmitTest = async (event) => {
        event.preventDefault();
        try {
            const testResponse = await axios.get(
                `http://50.19.168.7:5000/tests/${selectedProblem.id}`
            );
            const tests = testResponse.data;

            const postData = {
                problem: selectedProblem,
                tests: tests,
                language: selectedLanguage,
                code: codeRef.current.value,
            };
            console.log(postData);

            const response = await axios.post("https://co81dbv79l.execute-api.us-east-1.amazonaws.com/dev", postData);
            console.log(response.data);
            window.alert("Success! :), wait for the results on the leaderboard")
        } catch (error) {
            window.alert(error);
        }
    };
    return (
        <div className="form-container">
            <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
            />
            <TextInputWithSubmit
                codeRef={codeRef}
                handleSubmit={handleSubmitTest}
            />
        </div>
    );
};

export default FormContainer;
