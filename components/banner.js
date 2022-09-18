


const Banner = (props) => {
    return <div className="text-center flex h-screen  bg-orange-200 bg-opacity-80  ">
                <div className=" m-auto   ">
                    <h1 className="m-6 sm:m-12 text-left  ">
                        <span className="text-xl font-bold drop-shadow-lg text-stone-800	 ">The  </span><br/>
                        <div lassName="relative">                            
                            <span className="relative text-8xl font-bold bg-clip-text text-transparent
                             bg-gradient-to-tr from-orange-900 to-rose-900 p-12 drop-shadow-md	"> Joy of Coffee, </span><br/>          
                        </div>
                        <span className="text-5xl font-bold leading-loose	drop-shadow-lg	text-stone-800	">Next to You.</span><br/> 
                        <span className="nimate-pulse  ml-1 text-left  text-stone-800	">Discover your local coffee shops.</span>
                    </h1>

                    <p className="a"></p>

                    <div class="px-8 py-10 text-left " >
                        <div class="grid gap-8 items-start justify-center">
                            <div class="relative group">
                            <div class="absolute -inset-0.5 bg-gradient-to-r from-stone-800 to-rose-900 rounded-lg blur opacity-75 
                            group-hover:opacity-100  transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <button class="relative px-7 py-4 bg-white rounded-lg  leading-none flex items-center divide-x divide-gray-600">
                                <span class="flex items-center space-x-1">
                                
                                <svg className="stroke-stone-800 stroke-1 h-7 w-7 ml-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path  stroke-linecap="round" stroke-linejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
</svg>


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