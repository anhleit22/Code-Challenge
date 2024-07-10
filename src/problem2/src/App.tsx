import { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import "./App.css";

type optionCoins = {
  currency: string;
  date: any;
  price: number;
}[];
type optionCoin = {
  currency: string;
  date: any;
  price: number;
};

function App() {
  const [value, setValue] = useState<any>(1);
  const [selectedOption, setSelectedOption] = useState<optionCoin | null>(null);
  const [valueConvert, setValueConvert] = useState<any>(null);
  const [option, setOption] = useState<optionCoins>([
    {
      currency: "",
      date: new Date(),
      price: 0.20811525423728813,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setOption(data);
      } catch (error) {}
    };
    fetchPrices();
    setValueConvert(option[0].price);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;

    const selected =
      option.find((option) => option.currency === selectedName) || null;

    if (selected !== undefined) {
      setSelectedOption(selected);
      setValueConvert(selectedOption?.price);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      Store.addNotification({
        title: "Success",
        message: "Swap Success",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      setLoading(false);
      setValue(1);
    }, 2000);
  };

  return (
    <div>
      <ReactNotifications defaultNotificationWidth={300} breakpoint={100} />
      <form
        onSubmit={handleSubmit}
        className=" flex justify-center flex-col  items-center h-[100vh] text-[#616e85]"
      >
        <div className="mb-[3vh] font-bold tracking-wider">SWAP COIN </div>
        <div className="flex">
          <div className="bg-[#eff2f5] p-1 grid grid-cols-2 gap-1 rounded-lg">
            <div className="col-span-1 bg-[white] rounded-tl-lg rounded-bl-lg">
              <div className="flex justify-between px-2 py-1">
                <span>USDT</span>
                <input
                  name="quaUsdt"
                  type="number"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  className="focus-visible:border-none focus-visible:outline-none text-right"
                />
              </div>
            </div>
            <div className="col-span-1 bg-[white] rounded-tr-lg rounded-br-lg ">
              <div className="flex px-2 py-1">
                <select
                  onChange={handleChange}
                  className="focus-visible:outline-none"
                >
                  {option.map((option, index) => (
                    <option key={index} value={option.currency}>
                      {option.currency}
                    </option>
                  ))}
                </select>
                <input
                  name="quaCoinConvert"
                  type="number"
                  value={
                    selectedOption
                      ? selectedOption.price * value
                      : valueConvert * value
                  }
                  className="focus-visible:border-none focus-visible:outline-none text-right"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center ml-[20px] bg-slate-200 rounded-lg hover:bg-slate-300 ">
            <button type="submit" className="px-4 py-2">
              Swap
            </button>
            {loading && (
              <div className="pr-4 ">
                <FaCircleNotch className="animate-spin" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
