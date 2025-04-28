const PortfolioActivities = () => {
    return (
        <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px]  flex flex-col bg-white rounded-t-[25px] rounded-b-xl gap-10 relative mb-10">
            {/* Portfolio Section */}
            <div className="p-[50px] border rounded-lg text-center">
                <h2 className="text-[14px] text-[#4D6182] font-bold mb-2">Portfolio</h2>
                <p className="text-[#4D6182] text-[13px] font-[400] mb-4">Upload your projects so more employers can reach out!</p>
                <button className="px-4 py-2 bg-[#EBEDF0] text-[#4D6182] rounded-lg ">
                    + Add Files
                </button>
            </div>

            {/* Activities Section */}
            <div className="p-[50px] border rounded-lg text-center">
                <h2 className="text-[14px] text-[#4D6182] font-bold mb-2">Activities</h2>
                <p className="text-[#4D6182] text-[13px] font-[400] mb-4">Your volunteering and student activities.</p>
                <button className="px-4 py-2 bg-[#EBEDF0] text-[#4D6182] rounded-lg">
                    + Add Activities
                </button>
            </div>
        </div>
    );
};

export default PortfolioActivities;
