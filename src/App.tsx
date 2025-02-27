import { useState, useEffect } from "react";
import pause from "./assets/img/stop pause.png";
import { Tasks } from "./components/todo/tasks";
function App() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [lastSelectedTime, setLastSelectedTime] = useState(1500);
  const [isClicked, setIsClicked] = useState(false);

  const BgColors = () => {
    if (lastSelectedTime === 300) return "bg-[#38858A]";
    if (lastSelectedTime === 900) return "bg-[#397097]";

    return "bg-[#BA4949]";
  };
  const TextColors = () => {
    if (lastSelectedTime === 300) return "text-[#38858A]";
    if (lastSelectedTime === 900) return "text-[#397097]";

    return "text-[#BA4949]";
  };
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            setTimeLeft(lastSelectedTime);
            setIsRunning(false);
          }, 1000);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, lastSelectedTime]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center pt-[50px] min-h-screen transition-colors duration-500 ease-in-out text-white ${BgColors()}`}
      >
        <div className="bg-white/10 pt-[20px] pb-[30px] text-center w-[480px] h-[312px] ">
          <div className="space-x-2">
            <button
              onClick={() => {
                setTimeLeft(1500);
                setLastSelectedTime(1500);
                setIsRunning(false);
              }}
              className={`border-none text-white m-0 rounded-md  text-[16px] px-3 h-7 cursor-pointer bg-none shadow-none font-light ${
                lastSelectedTime === 1500
                  ? `bg-black/15 border-none m-0 rounded-md  text-[16px] px-3 h-7 cursor-pointer  shadow-none text-white opacity-100 font-bold`
                  : ""
              }`}
            >
              Pomodoro
            </button>
            <button
              onClick={() => {
                setTimeLeft(300);
                setLastSelectedTime(300);
                setIsRunning(false);
              }}
              className={`border-none text-white m-0 rounded-md  text-[16px] px-3 h-7 cursor-pointer bg-none shadow-none font-light ${
                lastSelectedTime === 300
                  ? `bg-black/15 border-none m-0 rounded-md  text-[16px] px-3 h-7 cursor-pointer  shadow-none text-white opacity-100 font-bold`
                  : ""
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => {
                setTimeLeft(900);
                setLastSelectedTime(900);
                setIsRunning(false);
              }}
              className={`border-none text-white m-0 rounded-md  text-[16px] px-3 h-7 cursor-pointer bg-none shadow-none font-light ${
                lastSelectedTime === 900
                  ? `bg-black/15 border-none m-0 rounded-md  text-[16px] px-3 h-7 cursor-pointer  shadow-none text-white opacity-100 font-bold`
                  : ""
              }`}
            >
              Long Break
            </button>
          </div>
          <div className="text-[120px] select-none  font-bold flex items-center justify-center relative">
            {formatTime(timeLeft)}
          </div>
          <div className="text-center flex items-center justify-center relative ">
            <button
              onClick={() => {
                setIsRunning(!isRunning);
                setIsClicked(!isClicked);
              }}
              className={`cursor-pointer  border-none px-3 rounded-md shadow-[0px_6px_0px_rgb(235,235,235)]  text-[22px] h-[55px] ${TextColors()} font-bold w-[200px] bg-white transition-colors duration-500 ease-in-out   ${
                isRunning && "translate-y-[6px] shadow-none"
              }`}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <div
              className={`absolute cursor-pointer w-[164px] mx-auto right-0 top-[60%] translate-y-[-50%] transition-all duration-700 ease-in-out transform ${
                isRunning
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <button
                onClick={() => {
                  setTimeLeft(lastSelectedTime);
                  setIsRunning(false);
                }}
                className="w-[22px] cursor-pointer"
              >
                <img className="w-[22px]" src={pause} alt="#" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[20px]">
          <Tasks />
        </div>
      </div>
    </>
  );
}

export default App;
