import { useEffect, useState } from "react";
import Qori from "./component/Qori";

function App() {
  const [surah, setSurah] = useState([]);
  const [nomor, setNomor] = useState(1);
  const [ayat, setAyat] = useState([]);
  const [qori, setQori] = useState("01");

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => setSurah(data.data));
  }, []);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then((res) => res.json())
      .then((data) => setAyat(data.data.ayat));
  }, [nomor]);

  const convertToArabicNumeric = (number) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(digit => arabicNumbers[digit]).join('');
    };
  return (
    <div className="mx-auto rounded-2xl max-w-[1200px]">
      <div className=" bg-sky-500 shadow-md w-full py-1 mb-0.5 lg:mb-1">
      <h1 className="pb-3 text-3xl text-center bg-gradient-to-r from-green-800 to-slate-900 bg-clip-text text-transparent font-bold">
        Quran<span className="bg-gradient-to-r from-green-500 to-slate-900 bg-clip-text">Hub</span> 
      </h1>
      <div>
        <div className="flex justify-end mr-10">
          <Qori setQori={setQori}/></div></div>
      </div>

    <div className="flex mx-auto h-screen">
      <div className="grid grid-cols-1 w-300 noto text-slate-700 overflow-y-scroll text-center overflow-hidden lg:max-w-[300px]">
        {surah.map((surat) => (
          <div className="cursor-pointer border-1 my-0.5 bg-sky-300 border-slate-500 w-full py-1 rounded-2xl" key={surat.nomor}
              onClick={() => setNomor(surat.nomor)}>
            <p
            >
            {surat.namaLatin} ({surat.arti})
            </p>
            <p>
              {surat.jumlahAyat} Ayat
            </p>
          </div>
        ))}
      </div>
        <div className="text-black bg-slate-100 shadow-2xl w-800 overflow-y-scroll">
          {ayat.map((ayat) => (
            <div className="border-1 border-sky-300 py-4">
                <p className="amiri text-2xl/15 text-right p-4">
              {ayat.teksArab}
              <span className="border-2 px-2 py-2 text-xl mr-5 rounded-full">
                {convertToArabicNumeric(ayat.nomorAyat)}
              </span>
            </p>
              
            <p className="m-2 noto text-xl">{ayat.teksLatin}</p>
            <p className="m-2 noto">
              {ayat.teksIndonesia}
              
            </p>
          
          <audio className="max-w-[280px] lg:max-w-[500px]" src={ayat.audio[qori]} controls ></audio>
            </div>
        
          ))}
        </div>
      </div>
      </div>
  );
}

export default App;
