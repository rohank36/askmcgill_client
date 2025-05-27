import { CornerDownRight } from 'lucide-react';

const Prompts = ({onSubmit, prompt}:{onSubmit: (e: React.FormEvent, query: string) => void; prompt:string}) => {
    const userMsg = "Hi there\nAskMcGill hasn't been updated and doesn't have the right information for the new school year. We've noticed a massive spike in y'all coming here to ask questions and have decided to disable the service to ensure we don't tell you the wrong things. Reddit and reaching out to other students via LinkedIn or Facebook/WhatsApp groups is a good alternative.\nWe wish you all the best for the school year, you're gonna absolutely kill it!!! Have so much fun - AskMcGill Team :)"
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            alert(userMsg)
          //onSubmit(e as unknown as React.FormEvent,prompt);
        }
    };

    return(
        <div className='relative flex flex-col border rounded-lg pt-4 px-4 pb-10 w-36 h-36 cursor-pointer hover:bg-gray-100 transition' onClick={handleSubmit}>
            <h1 className='text-xs font-bold text-regularText'>{prompt}</h1>
            <div className='absolute bottom-2 left-2'>
                <CornerDownRight color='#7C7C7C'/>
            </div>
        </div>
    );
}

export default Prompts;