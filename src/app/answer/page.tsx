'use client';
import React, { useState, useEffect } from 'react';
import { useQueryContext } from '../QueryContext';
import SourceComponent from '../components/SourceComponent';
import Footer from '../components/Footer';
import ToastBtns from '../components/ToastBtns';
import SearchBar from '../components/SearchBar';
import Image from "next/image";

export default function AnswerPage(){
    const { queryData, setQueryData } = useQueryContext();
    const [displayQuery, setDisplayQuery] = useState<string>("");
    const [time, setTime] = useState<Number>(0);
    const [sources, setSources] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      if(queryData){
        //console.log(queryData)
        setDisplayQuery(queryData.query)
        setTime(queryData.time)
        setSources(queryData.sources)
        setAnswer(queryData.answer)
      }
    },[queryData]);

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
          setDisplayQuery(queryData!.query)
          setTime(queryData!.time)
          setSources(queryData!.sources)
          setAnswer(queryData!.answer)
        }else{
          alert('Error getting an answer.');
        }
        
      }catch(error){
        alert('Error getting an answer.');
        console.log(error)
      }finally{
        setLoading(false);
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
      }
    }

    return (
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Top Section: Display Query */}
        <div className="flex-none border-b">
          <div className="w-full py-4 items-center flex flex-col justify-center gap-y-2">
            <h1 className="text-xl font-bold text-gray-700">{displayQuery}</h1>
            <h3 className="text-xs text-regularText">
              {`Answered in ${time.toFixed(4)} seconds`}
            </h3>
          </div>
        </div>
    
        {/* Loading State */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className='flex flex-col justify-center items-center space-y-5'>
              <span className="loading loading-spinner loading-lg text-red-500"></span>
              <p className='text-xs text-regularText'>Thinking - may take a few seconds ...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Middle Container: Answer + Sources (fills remaining space) */}
            <div className="flex flex-row flex-1 overflow-hidden">
              {/* Answer Section (scrollable) */}
              <div className="flex-1 py-4 px-6 md:px-36 overflow-y-auto no-scrollbar">
                <div className="flex flex-row gap-2 mb-4">
                  <img
                    src="/red_circle_icon_2.png"
                    alt="Ask McGill Circular logo"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <h2 className="font-bold text-lg text-gray-700">Answer</h2>
                </div>
                <div className="whitespace-pre-wrap text-gray-700">{answer}</div>
              </div>
    
              {/* Sources Section (no scrolling) */}
              <div className="w-[20%] py-4 pl-4 pr-6 md:pl-6 md:pr-10">
                <div className="flex flex-row gap-2 mb-2">
                  <img
                    src="black_bird.png"
                    alt="Ask McGill Black Logo"
                    style={{ width: "26px", height: "28px" }}
                  />
                  <h1 className="font-bold text-lg text-gray-700">Sources</h1>
                </div>
                <div className="flex flex-col space-y-4">
                  {sources.map((source, index) => (
                    <SourceComponent key={index} source={source} />
                  ))}
                </div>
              </div>
            </div>
    
            {/* Bottom Section: Search Bar, Footer, Toasts */}
            <div className="flex-none flex flex-col items-center justify-center py-4 gap-y-3">
              <SearchBar
                onSubmit={handleSubmit}
                loading={loading}
                placeholder="What else do you want to know?"
              />
              <h3 className="text-xs text-regularText">The information has been retrieved from McGill University's academic websites and may contain errors or need updates</h3>
              <ToastBtns />
            </div>
          </>
        )}
      </div>
    );
    
}
