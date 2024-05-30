import { useRef } from "react";

const LanguageSelector = ({selectedLanguage, onLanguageChange}) => {
    const languages = ["JavaScript", "Python", "C#", "Java", "Kotlin", "C++"];
    const selectRef = useRef(null);

    const handleChange = () => {
        const selectedValue = selectRef.current.value;
        onLanguageChange(selectedValue);
    };

    return (
        <div>
            <label>Select Programming Language: </label>
            <select ref={selectRef} value={selectedLanguage} onChange={handleChange} disabled={true}>
                {languages.map((language, index) => (
                    <option key={index} value={language}>
                        {language}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;