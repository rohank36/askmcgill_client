import React, {useState} from "react";
import { MoveRight} from 'lucide-react';

const SearchBar = ({ onSubmit, loading, placeholder }: { onSubmit: (e: React.FormEvent, query: string) => void; loading: boolean; placeholder: string }) => {
    const [query, setQuery] = useState('');

    const userMsg = "Hi there\nAskMcGill hasn't been updated and doesn't have the right information for the new school year. We've noticed a massive spike in y'all coming here to ask questions and have decided to disable the service until we update it to ensure we don't tell you the wrong things. Reddit and reaching out to other students via LinkedIn or Facebook/WhatsApp groups is a good alternative.\nWe wish you all the best for the school year, you're gonna absolutely kill it!!! Have so much fun - AskMcGill Team :)"
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        //onSubmit(e,query);
        alert(userMsg)
      }
    };
  
    return (
        <form className="flex gap-2 w-1/2 h-12 mt-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-200 p-2" onSubmit={handleSubmit}>
            <input 
              className="rounded-lg w-full focus:outline-none px-4 font-inter text-sm" 
              placeholder={placeholder} 
              type="text" 
              id="query" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"/>
 
            <button 
              type="submit"
              disabled={loading}
              className="flex p-2 items-center justify-center bg-iconsClicked rounded-full text-white font-bold hover:bg-mcgillRed transition duration-300 ease-in-out hover:scale-110"
              ><MoveRight size={16} strokeWidth={3}/>
            </button>
        </form>
    );
  };
  
  export default SearchBar;
  