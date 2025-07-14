import { useParams } from "react-router";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function JobApplications() {
    const { id } = useParams<{ id?: string }>();

    const [data, setData] = useState<any>({});

    useEffect(() => {
        axiosInstance.get(`/company/job-application/${id}`).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            console.error(err);
        });
    }, [id])
    console.log(data);
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo /></div>
    )
}
