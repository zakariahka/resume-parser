export const Form = () => {
    //why did I choose tailwind again?
    return(
    <div class="sm:max-w-lg m-auto w-full p-2 bg-white rounded-xl z-10">
        <h2 className="mb-8 text-2xl font-light">Drop Your Resume Here!</h2>
        <form class="mt-8 space-y-3" action="#" method="POST">
            <div class="grid grid-cols-1 space-y-2">
                <label class="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                <input class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Separate by commas"/>
            </div>
            <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
            <div class="flex items-center justify-center w-full">
                <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                        <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        </div>
                        <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" class="text-blue-600 hover:underline">select a file</a> from your computer</p>
                    </div>
                    <input type="file" class="hidden"/>
                </label>
            </div>
                </div>
                    <p class="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                    </p>
                <div>
                <button type="submit" 
                class="my-5 w-full flex justify-center 
                bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                font-semibold  focus:outline-none focus:shadow-outline 
                hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in 
                duration-300"
                >
                    Upload
                </button>
            </div>
        </form>
    </div>
    )
}