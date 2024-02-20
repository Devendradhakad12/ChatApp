import { Link } from "react-router-dom"

const Home = () => {
    const users = [
        {
            name: "devndra Dhakad",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },

        {
            name: "ajay dhakad ",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },

        {
            name: "priyanshu dhakad",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },
        {
            name: "priyanshu dhakad",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },
        {
            name: "priyanshu dhakad",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },
        {
            name: "priyanshu dhakad",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },
        {
            name: "priyanshu dhakad",
            icon: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
            id: "ernnvnromvtn"
        },
    ]
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-[80%] lg:w-[50%] md:w-[70%] w-[90%] rounded-xl border-2 border-white/60 ">

                {/* search bar */}
                <div className="max-w-md mt-5 sm:mx-auto mx-3">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </div>

                {/* Conversations */}
                <div className="overflow-auto scroll-hide h-[80%] mt-7">
                    {
                        users.map((user, i) => (
                            <Link to={`/${user.id}`} key={i}>
                                <div className="max-w-md mt-1 sm:mx-auto mx-3 h-[80px] px-3 py-1 flex items-center justify-between cursor-pointer" key={i}>
                                    <div className=" flex gap-[20px] items-center">
                                        <div className="avatar online">
                                            <div className="w-16 rounded-full">
                                                <img src={user.icon} className="w-[50px] h-[50px]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-[18px] font-semibold">
                                                {user.name}
                                            </h2>
                                            <p className="text-[12px]">Last message</p>
                                        </div>
                                    </div>
                                    <div>
                                        17:30
                                    </div>
                                </div>
                                <div className="divider max-w-md m-auto"></div>
                            </Link>
                        ))
                    }
                </div>
                {/* --------------------------- */}

            </div>
        </div>
    )
}

export default Home
