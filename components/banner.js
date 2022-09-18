


const Banner = (props) => {
    return <div className="text-center flex h-screen  bg-orange-200 bg-opacity-80  ">
                <div className=" m-auto   ">
                    <h1 className="m-6 sm:m-12 text-left  ">
                        <span className="text-xl font-bold drop-shadow-lg	 ">The  </span><br/>
                        <div lassName="relative">                            
                            <span className="relative text-8xl font-bold bg-clip-text text-transparent
                             bg-gradient-to-tr from-orange-900 to-rose-900 p-12 drop-shadow-md	"> Joy of Coffee, </span><br/>          
                        </div>
                        <span className="text-5xl font-bold leading-loose	drop-shadow-lg		">Next to You.</span><br/> 
                        <span className="nimate-pulse  ml-1 text-left 	">Discover your local coffee shops.</span>
                    </h1>

                    <p className="a"></p>

                    <div class="px-8 py-10 text-left " >
                        <div class="grid gap-8 items-start justify-center">
                            <div class="relative group">
                            <div class="absolute -inset-0.5 bg-gradient-to-r from-stone-800 to-rose-900 rounded-lg blur opacity-75 
                            group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <button class="relative px-7 py-4 bg-white rounded-lg leading-none flex items-center divide-x divide-gray-600">
                                <span class="flex items-center space-x-5">


                                <span class="pr-6 text-gray-600 px-10 py-2" onClick = {props.handleOnClick}>{props.buttonText}</span>
                                </span>
                               
                            </button>
                            </div>
                        </div>
                        </div>

                </div>
            </div>
}

export default Banner;