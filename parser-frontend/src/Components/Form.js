import { useState } from 'react'
import { useLeaderboardContext } from '../Hooks/useLeaderboardContext'
import { useAuthContext } from '../Hooks/useAuthContext';

export const Form = () => {
    const { dispatch } = useLeaderboardContext();
    const [name,setName] = useState('');
    const [keywords,setKeywords] = useState('');
    const [file,setFile] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuthContext();

    const emptyFields = () => {
      setFile('')
      setName('')
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        if(!user){
          setError('You must be logged in')
          return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('keywords', keywords);
        formData.append('file', file);

        setIsLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/add-applicant`,{
          method: 'POST',
			    body: formData,
			    headers: {
			      'Authorization': `Bearer ${user.token}`
			    }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        setIsLoading(false)
      }
      if (response.ok) {
        emptyFields();
        setError(null)
        setIsLoading(false);
        dispatch({type:'ADD_APPLICANT', payload:json})
      }
    }

    return(
        <div className="sm:max-w-lg m-auto w-full p-2 bg-white rounded-xl z-10">
        <h2 className="mb-8 text-2xl font-light">Drop Your Resume Here!</h2>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Applicant Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Enter the name of the applicant"
            />
          </div>
          <div className="grid grid-cols-1 space-y-2 my-3">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Keywords</label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Separate by commas"
            />
          </div>
          <div class="my-5">
            <label for="file-input" class="sr-only">Choose file</label>
            <input onChange={e => {setFile(e.target.files[0])}} type="file" name="file-input" id="file-input" class="my-2 block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                file:bg-transparent file:border-0
                file:bg-gray-100 file:mr-4
                file:py-3 file:px-4
                dark:file:bg-gray-700 dark:file:text-gray-400"/>
            <p className='font-light pt-4'> Only PDFs allowed</p>
            {isLoading && (<p className='font-light pt-4'> Loading...</p>)}
            {error && (<p className='font-light pt-4 text-red-400'> {error}</p>)}
            </div>
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    )
}