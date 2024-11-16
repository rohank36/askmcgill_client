'use client'
import React, {useState} from "react";
import Image from "next/image";
import SourceComponent from "./SourceComponent";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [displayQuery, setDisplayQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<Number>(0);
  const [sources, setSources] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");

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
      <div className="flex flex-col items-center min-h-screen w-full pt-8">
        <h1 className="font-bold text-5xl text-red-500">Ask McGill 💻</h1>
        <h3 className="text-md text-slate-500 mt-2">Our AI currently only has knowledge about McGill COMP courses. More to come.</h3>

        <form className="flex gap-2 w-3/4 h-12 mt-10" onSubmit={handleSubmit}>
          <input 
            className="border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 px-4" 
            placeholder="Ask anything about McGill..." 
            type="text" 
            id="query" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}/>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-red-600 rounded-lg p-2 text-white font-bold hover:bg-red-800 transition duration-300 ease-in-out"
            >Search
          </button>
        </form>
      
        <div className="flex flex-row w-full mt-10 my-10 px-10 gap-2">
          <div className="px-10 py-2 border-2 rounded-lg mx-auto w-3/4 h-96 overflow-auto">
            <div className="flex justify-center items-center">
              {loading && <span className="loading loading-spinner loading-lg text-red-500 mt-36"></span>}
            </div>
            <div>
              {!loading && answer && (
                <div className="whitespace-pre-wrap">
                  <p>{answer}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col px-10 py-2 w-1/4 h-96 overflow-auto space-y-2">
              <h1>Answer Sources</h1>
              {sources.map((source, index) => (
                <SourceComponent key={index} source={source} />
              ))}
          </div>
        </div>

        <div>
            {!loading && answer && (
              <div>
                <p className="font-bold text-slate-500">Answer generated in: {time.toFixed(4)} seconds</p>
              </div>
            )}
        </div>


      </div>
    </main>
  );
}
