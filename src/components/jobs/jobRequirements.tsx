
export default function JobRequirements({ data }: { data?: any }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                {
                    data?.description ? (
                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    ) : (
                        <p className="text-gray-500">No description available</p>
                    )
                }


            </div>
            <div className="w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold my-4">Requirements</h2>
                {
                    data?.description ? (
                        <div dangerouslySetInnerHTML={{ __html: data.requirements }} />
                    ) : (
                        <p className="text-gray-500">No description available</p>
                    )
                }
            </div>
        </div>
    );
};

