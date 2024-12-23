'use client'
import React, {useState, useRef} from "react";
import Image from "next/image";
import { MoveRight, CircleHelp, Info, MessageCircle} from 'lucide-react';

const ToastBtns = () =>{
    const modalRef1 = useRef<HTMLDialogElement>(null);
    const modalRef2 = useRef<HTMLDialogElement>(null);
    const modalRef3 = useRef<HTMLDialogElement>(null);
    const openModal = (reference: React.RefObject<HTMLDialogElement>) => {
        if (reference?.current) {
        reference.current.showModal();
        }
    };

    const toastIconColor = "#ff5d62"

    return(
        <div className="toast toast-start gap-y-4">
            <button className="hover:scale-110 transition duration-500 ease-in-out" onClick={() => openModal(modalRef3)}><MessageCircle color={toastIconColor} size={20} /></button>
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

            <button className="hover:scale-110 transition duration-500 ease-in-out" onClick={() => openModal(modalRef1)}><CircleHelp color={toastIconColor} size={20}/></button>
            <dialog ref={modalRef1} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg ">Faced an issue while using AskMcGill?</h3>
                <div className="flex flex-col gap-y-4 py-4">
                  <p className="text-wrap">Please contact _________ or message in the Bug channel on the discord and we'll immediately work to resolve it. Thank you for your patience and understanding.</p>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <button className="hover:scale-110 transition duration-500 ease-in-out" onClick={() => openModal(modalRef2)}><Info color={toastIconColor} size={20}/></button>
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
    );
}
export default ToastBtns;

