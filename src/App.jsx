import { useEffect, useState, useRef, useCallback } from "react";

const App = () => {
    const [password, setPassword] = useState("");
    const [pwLength, setPwLength] = useState(8);
    const [allowNumbers, setAllowNumbers] = useState(false);
    const [allowCharacters, setAllowCharacters] = useState(false);

    // password ref
    const passwordRef = useRef(null);

    const copyPassword = () => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 50);
        window.navigator.clipboard.writeText(password);
    };

    const generatePassword = useCallback(() => {
        let generatedPassword = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (allowNumbers) str += "0123456789";
        if (allowCharacters) str += "!@#$%^&*()-_+={}[]~`";

        for (let i = 0; i <= pwLength - 1; i++) {
            let charIndex = Math.floor(Math.random() * str.length);
            generatedPassword += str.charAt(charIndex);
        }
        setPassword(generatedPassword);
    }, [pwLength, allowNumbers, allowCharacters, setPassword]);

    useEffect(() => {
        generatePassword();
    }, [pwLength, allowNumbers, allowCharacters, generatePassword]);

    return (
        <div className="bg-black h-screen w-screen flex items-center justify-center">
            <div className="text-white w-[600px] bg-slate-700 rounded-lg flex flex-col justify-center">
                <h1 className="text-2xl font-semibold text-center border-b-4 border-black py-3">
                    Password Generator
                </h1>
                <div className="px-4 py-6 flex flex-col gap-4">
                    <div className="w-full flex gap-1">
                        {/* password field */}
                        <input
                            type="text"
                            name="password"
                            id="password"
                            value={password}
                            readOnly
                            ref={passwordRef}
                            className="text-black bg-slate-300 w-full outline-none h-10 px-2 font-normal text-lg rounded-md border-2 border-slate-700 focus-within:border-slate-500"
                        />
                        {/* copy password button */}
                        <button
                            type="submit"
                            onClick={copyPassword}
                            className="h-10 px-3 rounded-md text-center bg-blue-600 hover:bg-blue-800 transition-colors delay-100"
                        >
                            Copy
                        </button>
                    </div>

                    <div className="w-full flex justify-between">
                        {/* input length */}
                        <div className="flex items-center gap-1">
                            <input
                                type="range"
                                name="length"
                                id="length"
                                min={8}
                                max={50}
                                value={pwLength}
                                onChange={(event) =>
                                    setPwLength(event.target.value)
                                }
                                className="cursor-pointer"
                            />
                            <label>Length: {pwLength}</label>
                        </div>

                        {/* number checkbox */}
                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="number"
                                id="number"
                                defaultChecked={allowNumbers}
                                onChange={() =>
                                    setAllowNumbers((prev) => !prev)
                                }
                                className="cursor-pointer"
                            />
                            <label htmlFor="number" className="cursor-pointer">
                                Numbers
                            </label>
                        </div>

                        {/* character checkbox */}
                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="character"
                                id="character"
                                className="cursor-pointer"
                                defaultValue={allowCharacters}
                                onChange={() =>
                                    setAllowCharacters((prev) => !prev)
                                }
                            />
                            <label
                                htmlFor="character"
                                className="cursor-pointer"
                            >
                                Characters
                            </label>
                        </div>
                    </div>

                    {/* regenerate password button */}
                    <button
                        type="submit"
                        onClick={generatePassword}
                        className="h-10 px-3 rounded-md text-center bg-blue-600 hover:bg-blue-800 transition-colors delay-100"
                    >
                        Regenerate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
