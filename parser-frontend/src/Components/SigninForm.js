import { useState } from 'react'
import { useSignin} from '../Hooks/useSignin'

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signin, isLoading, error } = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(email,password)
    } 

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input
          value={email}
          onChange={e => setEmail(e.target.value)} 
          id="email" 
          name="email" 
          type="email" 
          autoComplete="email" 
          required 
          className="block w-full rounded-md border-0 p-2
           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
            focus:ring-indigo-600 sm:text-sm
             sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input
          value={password}
          onChange={e => {setPassword(e.target.value)}} 
          id="password" 
          name="password" 
          type="password" 
          autoComplete="current-password" 
          required 
          className="block w-full rounded-md border-0 p-2
          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
           placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
           focus:ring-indigo-600 sm:text-sm 
           sm:leading-6"/>
        </div>
      </div>

      <div>
        <button
        disabled={isLoading}
          type="submit"
          className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
        >
          Login
        </button>
        <p>Don't have an account? <a href='/signup' className='hover:underline text-blue-400'>Sign up</a> </p>
      </div>
      {isLoading && <div className='text-center'>Loading...</div>}
      {error && <div className='text-red-400 text-center'>{error}</div>}
    </form>
  </div>
</div>
  )
}

export default SigninForm