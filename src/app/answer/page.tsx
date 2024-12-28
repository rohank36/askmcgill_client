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
        await fetch(`http://127.0.0.1:5000/trackQuery`, {
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

    return(
        <div className='flex flex-col min-h-screen'>

          {/* Display Query */}
          <div className="w-full py-4 border items-center flex flex-col justify-center gap-y-2">
            <h1 className="text-xl font-bold text-gray-700">{displayQuery}</h1>
            <h3 className='text-xs text-regularText'>{`Answered in ${time.toFixed(4)} seconds`}</h3>
          </div>
          
          {!loading ? (
            <div className="flex flex-row w-full h-full">
            {/* Answer Section */}
            <div className="flex-1 max-w-[80%] h-full py-4">
              <div className='px-36 overflow-auto'>
                <div className='flex flex-row gap-2'>
                  <img src="/red_circle_icon_2.png" alt="Ask McGill Circlular logo" style={{ width: "32px", height: "32px" }}/>
                  <h2 className="font-bold text-lg text-gray-700 mb-4">Answer</h2>
                </div>
                <p className="whitespace-pre-wrap text-gray-700">{answer}</p>
              </div>
              <div className='flex justify-center items-center w-full absolute bottom-12'>
                <SearchBar onSubmit={handleSubmit} loading={loading} placeholder="What else do you want to know?"/>
              </div>
            </div>

            {/* Sources Section */}
            <div className="flex flex-col py-4 pl-6 pr-10 max-w-[20%] overflow-y-auto space-y-4">
              <div className='flex flex-row gap-2'>
                <img src="black_bird.png" alt="Ask McGill Black Logo" style={{ width: "26px", height: "28px"}} />
                <h1 className='font-bold text-lg text-gray-700'>Sources</h1>
              </div>
              {sources.map((source, index) => (
                <SourceComponent key={index} source={source} />
              ))}
            </div>
          </div>
          ):(
            <div className='flex justify-center items-center mt-48'>
              <span className="loading loading-spinner loading-lg text-red-500"></span>
            </div>
          )}
          
          <div className='flex justify-center'>
            <Footer />
          </div>
          <ToastBtns />
        </div>
    );
}
