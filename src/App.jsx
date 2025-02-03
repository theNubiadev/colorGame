import { ShuffleIcon } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  // declared the hex for the color code
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  // logged the random colors to the console
  // console.log(color);
  return color;
};

// generate random colors 
const generateColorOptions = (targetColor) => {
  const colors = [targetColor];
  // list the amount of colors to be generated i.e 6 
  while (colors.length < 6) {
    const newColor = generateRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  };
  return colors.sort(() => Math.random() - 0.5);
};

function App() {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const initializeGame = useCallback(() => {
    const newTargetColor = generateRandomColor();
    setTargetColor(newTargetColor);
    setColorOptions(generateColorOptions(newTargetColor));
    setGameStatus("");
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
//  logic to handle the  color guess
  const handleColorGuess = (color) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("Correct! Well done ");
      setIsCorrect(true);
    } else {
      setGameStatus("Wrong! Try again!");
      setIsCorrect(false);
    }
  }
  return (
    <>

      <main className="min-h-screen w-full bg-gray-100 p-4 sm:p-8 ">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="justify-center ">
          <h1 className="text-2xl sm:text-3xl text-center" data-testid="gameInstructions" >Guess the Correct Color </h1>
      <p className="text-center mx-auto ">Select the options in the box based on color shown </p>
          </div>

          <div className="w-full justify-center aspect-video sm:aspect-[2/1] rounded-lg shadow-lg transition-all duration-300"
            style={{ backgroundColor: targetColor }}
            data-testid="colorBox" />

    
          <div className={`text-center text-lg font-semibold transition-opacity duration-300 
               ${gameStatus ? "opacity-100 " : "opacity-0"} 
               ${isCorrect ? "text-green-600 " : "text-red-600"} `}
               data-testid="gameStatus">
            {gameStatus}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {colorOptions.map((color, index) => (
              <button key={index}
                data-testid="colorOption"
                className="aspect-[2/1] rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                style={{backgroundColor: color}}
                onClick={() => handleColorGuess(color)} />
                   ))} 
            </div>

          <div className="flex justify-between items-center px-4 ">
            <div className="text-xl font-bold text-gray-800"
              data-testid="score">
              Score: {score}
            </div>

            <button data-testid="newGameButton"
              onClick={initializeGame}
              className="flex place-items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200" >
              <ShuffleIcon className="w-5 h-5  " /> New Colors   </button>

          </div>
        </div>


      </main>



    </>
  )
}

export default App