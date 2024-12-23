'use client'
import React, {useState} from "react";
import { useRouter } from 'next/navigation';
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import ToastBtns from "./components/ToastBtns";
import { useQueryContext } from "./QueryContext";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setQueryData } = useQueryContext();

  const handleSubmit = async(e:React.FormEvent, query:string) =>{
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
        setQueryData({
          query: query,
          answer: parsedAnswer,
          sources: data.sources,
          time: data.elapsed_time,
        });
        setLoading(false);
        router.push("/answer");
      }else{
        alert('Error getting an answer.');
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
    <main className="font-inter">
      <div className="flex flex-col items-center justify-center min-h-screen pb-56">
        <Header />
        {loading ?  <span className="loading loading-spinner loading-lg text-red-500 mt-36"></span> : (<SearchBar onSubmit={handleSubmit} loading={loading} placeholder="Let's get that semester sorted... what's first?" />)}
        <Footer />
        <ToastBtns />
      </div>
    </main>
  );
}
