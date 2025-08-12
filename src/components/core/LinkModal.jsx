import React from 'react'
import { useState } from 'react';
import { FaCopy } from "react-icons/fa";
import { LuCopyCheck } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { IoMdCheckmarkCircle } from "react-icons/io";

const LinkModal = ({ setLinkModal, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [encodedUrl, setEncodedUrl] = useState("");
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        const encoded = encodeURIComponent(JSON.stringify(data));
        const url = `${window.location.origin}/view?data=${encoded}`;
        setEncodedUrl(url);
        setIsOpen(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(encodedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="flex flex-col gap-5 bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
                <h1 className="text-xl text-richblack-5 font-bold mb-4">Generate Encoded Share Link</h1>
                <div className='flex justify-between'>
                    <button
                        onClick={generateLink}
                        type="button" className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-95 transition-transform duration-200">
                        Generate Link
                    </button>
                    <button
                        onClick={() => setLinkModal(false)}
                        type="button" className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-95 transition-transform duration-200">
                        Close
                    </button>
                </div>

                {/* Modal */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="bg-richblack-800 w-[500px] rounded-lg p-6 shadow-lg">
                            <h2 className="text-lg text-richblack-5 font-semibold mb-4">Your Encoded Link</h2>
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <input
                                    type="text"
                                    value={encodedUrl}
                                    readOnly
                                    className="flex-1 px-3 bg-richblack-900 text-richblack-50 py-2 border-none outline-none"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 text-richblack-5"
                                >
                                    {
                                        copied ? <IoMdCheckmarkCircle /> : <LuCopy />
                                    }
                                </button>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    type="button" className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-95 transition-transform duration-200">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LinkModal
