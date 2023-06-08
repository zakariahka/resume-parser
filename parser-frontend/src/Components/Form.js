import { useState } from 'react'
import  axios  from 'axios';
import { useLeaderboardContext } from '../Hooks/useLeaderboardContext'

export const Form = () => {
    const { dispatch } = useLeaderboardContext();
    const [name,setName] = useState('');
    const [keywords,setKeywords] = useState('');
    const [file,setFile] = useState('');
    const [error, setError] = useState(null);

    const emptyFields = () => {
      setFile('')
      setName('')
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('keywords', keywords);
        formData.append('file', file);
    
        axios.post(`${process.env.REACT_APP_API_ADD_APPLICANT_URL}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            console.log(response.data);
            dispatch({type:'ADD_APPLICANT', payload:response.data})
            emptyFields();
          })
          .catch(error => {
            console.error(error);
            setError(error);
          });
      };

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
            {error && (<p className='font-light pt-4 text-red-400'> The file you sent was not a PDF</p>)}
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