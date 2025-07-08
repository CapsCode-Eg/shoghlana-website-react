
export default function JobRequirements({ data }: { data?: any }) {
    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            {
                data?.description ? (
                    <p className="text-gray-700">{data.description}</p>
                ) : (
                    <p className="text-gray-500">No description available</p>
                )
            }

        </div>
    );
};

