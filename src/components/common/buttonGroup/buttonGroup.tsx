import { BiRefresh } from "react-icons/bi";

const ButtonGroup = ({ handleSubmit, isDisabled = false, isLoading = false }: { isDisabled?: boolean, isLoading?: boolean, handleSubmit: () => void }) => {

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className="flex flex-row-reverse items-center justify-center gap-4 mt-6">
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isDisabled || isLoading}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main '} disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                aria-label="Submit form"
            >
                {isLoading ? (
                    <>
                        <BiRefresh className="animate-spin h-5 w-5" />
                        <span>Processing...</span>
                    </>
                ) : (
                    "Submit"
                )}
            </button>

            <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                aria-label="Cancel operation"
            >
                Cancel
            </button>
        </div>
    );
};

export default ButtonGroup;