import { Link, useParams } from "react-router-dom";
import { GiArrowWings } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

const Conversation = () => {

    const userId = useParams().id

    const messages = [
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
        {
            name: "dev",
            message: "message"
        },
    ]

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-[80%] lg:w-[50%] md:w-[70%] w-[90%] rounded-xl border-2 border-white/60 relative">

                {/* search bar */}
                <div className="mt-1 sm:mx-auto mx-3 h-[80px] border-b border-white/20 flex justify-between items-center px-[6%]">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <img src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className="w-[50px] h-[50px]" />
                        </div>
                    </div>
                    <div className="flex gap-[20px] items-center">
                        <h2 className="text-[25px]">User Name</h2>
                        <Link to={"/"} className="text-[30px]"><FaHome /></Link>
                    </div>
                </div>

                {/* Conversations */}
                <div className="overflow-auto scroll-hide h-[67%] mt-7 px-[10%]">
                    {
                        messages.map((e, i) => (
                            <div className="chat chat-end" key={i}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">
                                    Delivered
                                </div>
                            </div>

                        ))
                    }
                </div>
                <div className=" absolute bottom-5 left-0 w-full flex justify-center gap-[30px] items-center">
                    <input type="text" placeholder="Type here" className="input input-bordered input-accent w-[80%] max-w-full" />
                    <button className="text-[30px] hover:scale-110 active:scale-50 active:opacity-5 transition-all duration-100 active:translate-x-6 active:-translate-y-6"><GiArrowWings /></button>
                </div>


            </div>
        </div>
    )
}

export default Conversation
