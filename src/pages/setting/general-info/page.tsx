
import { useCompany } from './hooks/useCompany'
import { DocumentUpload } from './components/documentUpload'
import { FileUpload } from './components/fileUpload'
import CustomSelectMultipleMenu from './components/customeMultiSelectMenu'
import TextEditor from './components/textEditor'
import InputPhone from './components/inputPhone'
import { useEffect, useState } from 'react'
import Layout from '../../../components/setting/layout'
import InputAndLabel from '../../../components/input/inputAndLabel'
import CustomSelectMenu from '../../../components/customeSelectMenu/customSelectMenu'

export default function GeneralInfo() {
    const { data, errors, setData, handleArrayChange, handleSubmit, cities, countries, loading, handleFilesChange, handleChangeNumber, handleDocumentFilesChange, industries, files } = useCompany();
    const [isUser, setIsUser] = useState<boolean | null>(null);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}');
        setIsUser(user?.type !== 'company');
    }, []);


    if (isUser === null) return null; // or a loading spinner

    return (
        <Layout>
            <div className=" shadow-2xl p-6 mb-20 mx-auto rounded-[25px] overflow-hidden w-full">
                {isUser ?
                    <>
                        <div className="bg-main p-8 text-center">
                            <div className='bg-main w-fit mx-auto'>
                                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto overflow-hidden border-4 border-white">
                                    <img src={data?.image ? data?.image : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-white text-xl font-semibold mt-4">Profile Photo</h2>
                                <p className="text-white text-sm">You can upload a .jpg, .png, or .gif photo with max size of 5MB.</p>
                                <div className="mt-2 text-white">
                                    <label htmlFor="inputFile" className="underline hover:cursor-pointer">Change Photo</label>
                                    <input id='inputFile' type="file" className="hidden" />
                                </div>
                            </div>
                        </div>

                        <form className="p-8">
                            <section>
                                <h3 className="text-lg font-semibold">Your information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <InputAndLabel label="First Name" />
                                    <InputAndLabel label="Last Name" />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <InputAndLabel label="Birthdate" type='date' />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                    <CustomSelectMenu label="Genedar" />
                                </div>
                            </section>

                            <section className="mt-8">
                                <h3 className="text-lg font-semibold">Your Location</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <CustomSelectMenu defaultData={data?.country_id && +(data?.country_id) || null} label="Country" placeholder="Select Country" options={countries} onChange={(value: any) => setData({ ...data, country_id: value?.id })} error={errors?.country_id} />
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <CustomSelectMenu defaultData={data?.city_id && +(data?.city_id) || null} label="City" placeholder="Select City" options={cities} onChange={(value: any) => setData({ ...data, city_id: value?.id })} error={errors?.city_id} />
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <CustomSelectMenu defaultData={data?.company_size && +(data?.company_size) || null} label="Company Size" placeholder="Select Size" options={[{ id: 1, name: "2-10" }, { id: 2, name: "10-50" }, { id: 3, name: "50-100" }, { id: 4, name: "100-200" }, { id: 5, name: "200+" }]} onChange={(value: any) => setData({ ...data, company_size: value?.id })} error={errors?.company_size} />
                                </div>
                            </section>

                            <section className="mt-8">
                                <h3 className="text-lg font-semibold mb-4">Contact info</h3>
                                <InputAndLabel placeholder='e.g. 01012345678' label='Phone' />
                            </section>
                        </form>
                    </>
                    :
                    <>
                        <div className="flex flex-col min-w-[80%] gap-4 mx-auto mt-6 pb-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputAndLabel label="Company Name" name="first_name" type='text' value={data?.first_name || ""} setData={setData} error={errors?.first_name} />
                                <InputAndLabel label="Company Email" name="email" type='text' value={data?.email || ""} setData={setData} error={errors?.email} />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {/* <InputAndLabel label="Company Password" name="password" type='password' see value={data?.password || ""} setData={setData} error={errors?.password} /> */}
                                <InputPhone value={data?.mobile || ""} name='mobile' placeholder='95474115874' label='Mobile Number' onChange={handleChangeNumber} error={errors?.mobile} />
                            </div>
                            <InputAndLabel label="Hiring title" name="hiring_title" type='text' value={data?.hiring_title || ""} setData={setData} error={errors?.hiring_title} />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <CustomSelectMenu defaultData={data?.country_id && +(data?.country_id) || null} label="Country" placeholder="Select Country" options={countries} onChange={(value: any) => setData({ ...data, country_id: value?.id })} error={errors?.country_id} />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <CustomSelectMenu defaultData={data?.city_id && (data?.city_id) || null} label="City" placeholder="Select City" options={cities} onChange={(value: any) => setData({ ...data, city_id: value?.id })} error={errors?.city_id} />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <CustomSelectMenu defaultData={data?.company_size && +(data?.company_size) || null} label="Company Size" placeholder="Select Size" options={[{ id: 1, name: "2-10" }, { id: 2, name: "10-50" }, { id: 3, name: "50-100" }, { id: 4, name: "100-200" }, { id: 5, name: "200+" }]} onChange={(value: any) => setData({ ...data, company_size: value?.id })} error={errors?.company_size} />
                            </div>
                            <InputAndLabel label="Founded Year" type="number" name="founded_year" min="1900" max="2099" step="1" placeholder="YYYY" value={data?.founded_year || ""} setData={setData} error={errors?.founded_year} />
                            <div className="h-[20vh]">
                                <TextEditor
                                    label='About'
                                    value={data?.about}
                                    error={errors?.about}
                                    onChange={(e) => {
                                        setData({ ...data, about: e.target.value });
                                    }}
                                />
                            </div>
                            <CustomSelectMultipleMenu
                                name="industry"
                                defaultData={data?.industry ? data?.industry : []}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(value: any) => setData({ ...data, industry: value })}
                                error={errors?.industries} label="Industries" placeholder="Select Industry" options={industries} />
                            <h1 className="text-2xl font-bold text-[#0E4E5D]">Files</h1>
                            <FileUpload
                                oldFiles={files}
                                error={errors?.image}
                                label="Company Logo"
                                onFilesChange={handleFilesChange}
                                maxFileSize={20 * 1024 * 1024} // 20MB
                                accept="image/*"
                                multiple={false}
                            />
                            <div className="relative">
                                <h2 className="mb-[6px] text-[#0E4E5D] font-medium text-base flex flex-row items-center dark:text-shadow_blue">(Tax card or Commercial register) Upload</h2>
                                <DocumentUpload
                                    error2={errors?.tax_card}
                                    onFilesChange={handleDocumentFilesChange}
                                    maxFileSize={10 * 1024 * 1024} // 10MB
                                    accept=".pdf,.doc,.docx,.txt"
                                    multiple={false}
                                    oldFiles={data?.tax_card}
                                />
                            </div>
                            <div className="relative">
                                <div className="">
                                    <div className="flex justify-between items-center mb-6">
                                        <h1 className="text-2xl font-bold text-[#0E4E5D]">Social Media Links</h1>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            data?.social_media?.map((item: any, index: number) => {
                                                return (
                                                    <InputAndLabel key={index} label={`${item?.platform || item?.name} Link`} name={`social_media[${index}].url`} type='text' value={item?.url || ""}
                                                        onChange={(e) => handleArrayChange(index, e)}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='flex flex-row items-center justify-end w-full mt-10'>
                                        <button disabled={loading} onClick={handleSubmit} className='min-w-[150px] h-[45px] bg-main text-white flex flex-col items-center justify-center rounded-[14px]'>
                                            {loading && <div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2' />}
                                            {!loading && 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}
