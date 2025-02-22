'use client'
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import ToastBtns from "./components/ToastBtns";
import Prompts from "./components/Prompts";
import { useQueryContext } from "./QueryContext";
import { generateUUID } from "./uuidGenerator";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setQueryData } = useQueryContext();

  //On landing page mount, get or set UUID to keep track of user w/o having to create an account
  useEffect(()=>{
    if (!localStorage.getItem('user_id')) {
      localStorage.setItem('user_id', generateUUID());
    }
  },[])

  const handleSubmit = async(e:React.FormEvent, query:string) =>{
    e.preventDefault();
    setLoading(true);
    
    try{
      //http://127.0.0.1:5000/query
      //http://127.0.0.1:5000/trackQuery
      const res = await fetch(`https://www.askmcgill.space/query`, {
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

        //After answers have been retrieved for user, track user query
        await fetch(`https://www.askmcgill.space/trackQuery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            user_id: localStorage.getItem('user_id'), 
            query: query
          }),
        });

      }else{
        alert('Error getting an answer.');
      }
      
    }catch(error){
      console.log(error)
      setLoading(false);
      alert('Error getting an answer.');
    }finally{
      //setQuery("");
      setLoading(false);
    }
  }

  return (
    <main className="font-inter">
      <div className="flex flex-col items-center justify-center min-h-screen pb-36">
        <Header />
        {loading ?  
          <div className="flex flex-col items-center justify-center space-y-5 mt-10">
            <span className="loading loading-spinner loading-lg text-red-500 pt-16"></span>
            <p className='text-xs text-regularText'>Thinking - may take a few seconds ...</p> 
          </div>
        : (
          <div className="w-full flex flex-col justify-center items-center">
            <SearchBar onSubmit={handleSubmit} loading={loading} placeholder="Let's get that semester sorted... what's first?" />
            <div className="flex flex-row gap-4 mt-10">
              <Prompts onSubmit={handleSubmit} prompt="What machine learning related COMP courses are there?"/>
              <Prompts onSubmit={handleSubmit} prompt="What courses can I take to learn more about Aristotle?"/>
              <Prompts onSubmit={handleSubmit} prompt="Tell me which courses David Meger is teaching"/>
              <Prompts onSubmit={handleSubmit} prompt="Which 400+ level FINE courses don't require FINE 342 as a pre req?"/>
            </div>
          </div>
          )}
        <Footer />
        <ToastBtns />
      </div>
    </main>
  );
}
