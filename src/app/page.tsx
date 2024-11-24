'use client'
import React, {useState, useRef} from "react";
import Image from "next/image";
import SourceComponent from "./SourceComponent";
import { MoveRight, CircleHelp, Info, MessageCircle} from 'lucide-react';

//TODO: Add animations for answer appearence

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [displayQuery, setDisplayQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<Number>(0);
  const [sources, setSources] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");

  const modalRef1 = useRef<HTMLDialogElement>(null);
  const modalRef2 = useRef<HTMLDialogElement>(null);
  const modalRef3 = useRef<HTMLDialogElement>(null);
  const openModal = (reference: React.RefObject<HTMLDialogElement>) => {
    if (reference?.current) {
      reference.current.showModal();
    }
  };


  const handleSubmit = async(e:any) =>{
    e.preventDefault();
    setLoading(true);
    
    try{
      const res = await fetch(`http://127.0.0.1:5000/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if(res.ok){
        let parsedAnswer = data.answer;
        parsedAnswer = parsedAnswer.trim();
        if (parsedAnswer.startsWith("System:")) {
          parsedAnswer = parsedAnswer.slice(7).trim();
        }
        setAnswer(parsedAnswer)
        setTime(data.elapsed_time)
        setSources(data.sources)
      }else{
        setAnswer("Error getting an asnwer.")
      }
      
      
    }catch(error){
      console.error("Error getting query answer:", error);
      console.log(error)
    }finally{
      //setQuery("");
      setLoading(false);
    }
  }


  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen pb-56">
          <h1 className="font-bold text-5xl text-red-500">Welcome to AskMcGill 💻</h1>
          <h3 className="text-md text-slate-500 mt-2">Simplifying your search for McGill courses and resources</h3>

          <form className="flex gap-2 w-1/2 h-12 mt-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-200 p-2" onSubmit={handleSubmit}>
            <input 
              className="rounded-lg w-full focus:outline-none px-4" 
              placeholder="Let's get that semester sorted... what's first?" 
              type="text" 
              id="query" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}/>
 
            <button 
              type="submit" 
              disabled={loading}
              className="flex p-2 items-center justify-center bg-red-600 rounded-full text-white font-bold hover:bg-red-800 transition duration-300 ease-in-out hover:scale-110"
              ><MoveRight size={16} strokeWidth={3}/>
            </button>
          </form>

          <div className="flex absolute items-center justify-center bottom-3 gap-32">
            <h3 className="text-xs text-slate-500">The information has been retrieved from McGill University's academic websites and may contain errors or need updates</h3>
          </div>

          <div className="toast toast-start gap-y-4">
            <button className="hover:scale-110 transition duration-500 ease-in-out" onClick={() => openModal(modalRef3)}><MessageCircle color="red" size={30} /></button>
            <dialog ref={modalRef3} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Have any suggestions?</h3>
                <div className="flex flex-col gap-y-4 py-4">
                  <p className="text-wrap">We'd love to hear your feedback to improve the product.</p>
                  <p className="text-wrap">Feel free to join our discord and chat with us! ______</p>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <button className="hover:scale-110 transition duration-500 ease-in-out" onClick={() => openModal(modalRef1)}><CircleHelp color="red" size={30}/></button>
            <dialog ref={modalRef1} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg ">Faced an issue while using AskMcGill?</h3>
                <div className="flex flex-col gap-y-4 py-4">
                  <p className="text-wrap">Please contact _________ and we'll immediately work to resolve it. Thank you for your patience and understanding.</p>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <button className="hover:scale-110 transition duration-500 ease-in-out" onClick={() => openModal(modalRef2)}><Info color="red" size={30}/></button>
            <dialog ref={modalRef2} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">What is AskMcGill?</h3>
                <div className="flex flex-col gap-y-4 py-4">
                  <p className="text-wrap">AskMcGill is a search engine that directly answers any of your McGill related questions in seconds. Instead of having to search through a ton of different links on the McGill website.</p>
                  <p className="text-wrap">We built this to make McGill's information easier to find for students.</p>
                  <p className="text-wrap">We currently only have information on courses but will soon expand to all of McGill's information.</p>
                  <p className="text-wrap">The product is not perfect, but we're continously working to improve it with your feedback.</p>
                  <p className="text-wrap">Thank you for using AskMcGill. We hope you find it useful.</p>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>

      </div>
    </main>
  );
}

/*
<div className="w-full">
          {loading && (
            <div className="flex justify-center items-center">
              {loading && <span className="loading loading-spinner loading-lg text-red-500 mt-36"></span>}
            </div>
          )}
          {!loading && answer && (
            <div className="flex flex-row w-full mt-10 my-10 px-10 gap-2">

              <div className="px-10 py-2 border-2 rounded-lg mx-auto w-3/4 h-96 overflow-auto">
                <div className="whitespace-pre-wrap">
                  <p>{answer}</p>
                </div>
              </div>
    
              <div className="flex flex-col px-10 py-2 w-1/4 h-96 overflow-auto space-y-2">
                  <h1>Answer Sources</h1>
                  {sources.map((source, index) => (
                    <SourceComponent key={index} source={source} />
                  ))}
              </div>
            </div>
          )}
        </div>
      
        <div>
            {!loading && answer && (
              <div>
                <p className="font-bold text-slate-500">Answer generated in: {time.toFixed(4)} seconds</p>
              </div>
            )}
        </div>
        
*/