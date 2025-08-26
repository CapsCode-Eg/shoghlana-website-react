import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

interface ErrorPageProps {
    error?: Error | null;
    statusCode?: number;
    message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gradient-to-br from-main via-blue-400 to-main flex items-center justify-center p-8">
            <div className="max-w-6xl w-full flex flex-col md:flex-row gap-16 items-center justify-between">
                {/* Left side - Illustration */}
                <div className="flex-1 flex flex-col md:flex-row justify-center items-center">
                    <div className="relative">
                        {/* Space bubble/helmet */}
                        <div className="w-96 h-96 rounded-full  bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden shadow-2xl">
                            {/* Stars */}
                            <div className="absolute top-16 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
                            <div className="absolute top-32 right-24 w-1 h-1 bg-white rounded-full opacity-80"></div>
                            <div className="absolute bottom-28 left-16 w-1.5 h-1.5 bg-white rounded-full opacity-70"></div>
                            <div className="absolute top-24 right-16 w-1 h-1 bg-white rounded-full opacity-60"></div>
                            <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full opacity-50"></div>

                            {/* Planet/Moon */}
                            <div className="absolute top-12 right-16 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                                <div className="absolute top-3 left-4 w-3 h-3 bg-orange-700 rounded-full opacity-60"></div>
                                <div className="absolute bottom-4 right-3 w-2 h-2 bg-orange-700 rounded-full opacity-40"></div>
                            </div>

                            {/* Person sitting */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                                {/* Chair */}
                                <div className="w-16 h-12 bg-gradient-to-b from-orange-600 to-orange-800 rounded-t-lg mb-2 relative">
                                    <div className="absolute -bottom-2 left-2 w-3 h-6 bg-orange-700 rounded-b"></div>
                                    <div className="absolute -bottom-2 right-2 w-3 h-6 bg-orange-700 rounded-b"></div>
                                </div>

                                {/* Person body */}
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                    {/* Head */}
                                    <div className="w-8 h-8 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full mb-1"></div>

                                    {/* VR Headset */}
                                    <div className="absolute top-1 left-0 w-8 h-4 bg-gray-800 rounded-lg border border-gray-600"></div>

                                    {/* Body */}
                                    <div className="w-10 h-12 bg-white rounded-lg relative mt-2">
                                        {/* Arms */}
                                        <div className="absolute -left-2 top-2 w-6 h-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transform -rotate-12"></div>
                                        <div className="absolute -right-2 top-2 w-6 h-3 bg-gradient-to-l from-pink-400 to-pink-500 rounded-full transform rotate-12"></div>
                                    </div>

                                    {/* Legs */}
                                    <div className="flex justify-center space-x-1 mt-1">
                                        <div className="w-3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"></div>
                                        <div className="w-3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"></div>
                                    </div>

                                    {/* Feet */}
                                    <div className="flex justify-center space-x-2 mt-1">
                                        <div className="w-4 h-2 bg-white rounded-full"></div>
                                        <div className="w-4 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 text-center text-white">
                    {/* 404 Text */}
                    <h1 className="text-[38px] font-bold text-white mb-8 leading-none tracking-tight">
                        Something went wrong, We are sorry for the inconvenience
                    </h1>


                    {/* Subtitle */}
                    <p className="text-xl text-blue-100 mb-12 font-light">
                        Oops it seems you follow backlink
                    </p>

                    {/* Back to Home Button */}
                    <button onClick={() => {
                        window.localStorage.clear();
                        navigate('/')
                    }} className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 text-lg">
                        <ArrowLeft className="mr-3 h-5 w-5" />
                        Back To Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;