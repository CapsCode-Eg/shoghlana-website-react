
export default function HomePageCard({ data }: { data?: any }) {
    return (
        <blockquote className="min-w-[430px]">
            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.1868 24.7055V39.8968H6.10809V35.9583C6.10809 29.8068 6.5582 25.2307 7.45842 22.2299C8.43366 19.1542 10.9468 14.8031 14.9978 9.17676L21.4118 12.7776C18.036 18.554 16.0855 22.53 15.5604 24.7055H21.1868ZM41.6668 24.7055V39.8968H26.5881V35.9583C26.5881 29.8068 27.0382 25.2307 27.9384 22.2299C28.9137 19.1542 31.4268 14.8031 35.4778 9.17676L41.8918 12.7776C38.516 18.554 36.5655 22.53 36.0404 24.7055H41.6668Z" fill="#0055D9" />
            </svg>
            <div className="mt-4 flex flex-col">
                <p className="text-black font-[400] text-[25px]">{data?.rate}</p>
                <div className='flex flex-row mt-12 gap-4 items-center'>
                    <img width={60} height={45} className='object-cover rounded-full w-[66px] h-[66px]' src={data?.image ? data?.image : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww"} alt='Profile Icon' />
                    <div className='flex flex-col '>
                        <span className='font-medium text-[20px] text-[#292929]'>{data?.name}</span>
                        <span className="font-[400] text-[13px] text-[#737373] mb-1.5">{data?.position}</span>
                        <div className='flex flex-row items-center'>
                            {
                                ([...Array(+(data?.stars))]).map((__, index) => (
                                    <svg key={index} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.34191 0.537109C7.04402 0.537109 6.74614 0.691278 6.59197 1.00223L4.88566 4.46188L1.06803 5.01584C0.38342 5.11513 0.109052 5.95914 0.605527 6.44255L3.3675 9.13397L2.71424 12.9359C2.59665 13.6179 3.31524 14.1379 3.92668 13.8165L7.34191 12.024V0.537109Z" fill="#0055D9" />
                                        <path d="M7.29835 0.537109C7.59623 0.537109 7.89412 0.691278 8.04829 1.00223L9.75459 4.46188L13.5722 5.01584C14.2568 5.11513 14.5312 5.95914 14.0347 6.44255L11.2728 9.13397L11.926 12.9359C12.0436 13.6179 11.325 14.1379 10.7136 13.8165L7.29835 12.024V0.537109Z" fill="#0055D9" />
                                    </svg>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </blockquote>
    )
}
