
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
  console.log(color);
  return color;

  
  
 };

 const generateColorOptions = (targetColor) => {
  const colors = [targetColor];
  while (colors.length < 6) {
    const newColor = generateRandomColor();
    if (!colors.includes(newColor)){
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

  return (
   <>

  <main className="min-h-screen w-full bg-gray-100 p-4 sm:p-8 ">
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl sm:text-3xl" data-testid="gameInstructions"
      >Guess the Correct Color </h1>

    <div className="w-full aspect-video sm:aspect-[2/1] rounded-lg shadow-lg transition-all duration-300" 
        style={{backgroundColor: targetColor,}}
    data-testid="colorBox">


      <div className={`text-center text-lg font-semibold transition-opacity duration-300`}>

      </div>
    </div>


    </div>


  </main>



   </>
  )
}

export default App