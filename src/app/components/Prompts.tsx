import { CornerDownRight } from 'lucide-react';

const Prompts = ({onSubmit, prompt}:{onSubmit: (e: React.FormEvent, query: string) => void; prompt:string}) => {
    
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
          onSubmit(e as unknown as React.FormEvent,prompt);
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