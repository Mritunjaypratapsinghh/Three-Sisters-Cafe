import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { name, photoURL, address } = data;

        updateUserProfile(name, photoURL, address)
            .then(() => {
                alert("Profile updated successfully");
            })
            .catch((error) => {
                // Handle error
            });
    };

    return (
        <div className="min-h-screen mt-12 flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <p className="text-3xl font-semibold text-center mb-6 text-gray-800">User Profile</p>
                <div className="text-center mb-4">
                    {user && user.photoURL ? (
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src={user.photoURL}
                            alt="User avatar"
                        />
                    ) : (
                        <div className="w-20 h-20 mx-auto flex items-center justify-center text-yellow-300 mb-2 text-xl rounded-full bg-yellow-100">
                            <FaUserCircle />
                        </div>
                    )}
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        {user.displayName}
                    </h2>
                </div>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Your name"
                            className="mt-1 p-2 w-full rounded-lg border-gray-300 bg-yellow-100 focus:ring focus:ring-blue-200"
                        />
                        {errors.name && (
                            <span className="text-red-500">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-semibold">
                            Upload Photo
                        </label>
                        <input
                            type="file"
                            {...register("photoURL")}
                            className="mt-1 w-full text-sm text-gray-500 border rounded-lg bg-yellow-100 py-2 px-4 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-semibold">
                            Address
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
  <input type="text" className="grow" placeholder="House No." />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="text" className="grow" placeholder="Area" />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="State" />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" value="PinCode" />
</label>




                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-yellow-300 text-base hover:bg-yellow-400 text-slate-700 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
