import Image from "next/image";

const Header = () => {
    return(
        <div className="flex flex-col items-center justify-center text-center">
            <Image src="/askmcgill_icon.png" alt="AskMcGill Logo" width={75} height={75}/>
            <h1 className="font-bold text-5xl text-headlineText mt-12">Welcome to AskMcGill</h1>
            <h3 className="text-md text-regularText mt-2 mb-5">
                Simplifying your search for McGill courses and resources
            </h3>
        </div>
    );
};
  
export default Header;
  