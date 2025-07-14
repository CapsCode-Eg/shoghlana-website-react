import {
    createBrowserRouter,
} from "react-router";
import Home from "../pages/App";
import Applications from "../pages/applications/page";
import Login from "../pages/auth/login/page";
import LoginAsCompany from "../pages/auth/login-as-company/page";
import Profile from "../pages/auth/profile/page";
import SignUp from "../pages/auth/signup/page";
import SignUpIntro from "../pages/auth/signup-intro/page";
import Company from "../pages/company/[id]/page";
import CompanyProfile from "../pages/company_profile/page";
import Explore from "../pages/explore/page";
import ViewJob from "../pages/job/[id]/page";
import ApplyForJob from "../pages/job/[id]/apply/page";
import Saved from "../pages/saved/page";
import CareerInteresting from "../pages/setting/career-interests/page";
import ChangePassword from "../pages/setting/change-password/page";
import DeleteAccount from "../pages/setting/delete-account/page";
import Education from "../pages/setting/education-cv/page";
import ExperiencePage from "../pages/setting/experience/page";
import GeneralInfo from "../pages/setting/general-info/page";
import SocialMedia from "../pages/setting/online-presence/page";
import PublicProfile from "../pages/setting/public-profile/page";
import PostJob from "../pages/company_profile/post_job/post_job";
import CompanySignUp from "../pages/auth/company_signUp/companySignUp";
import JobApplications from "../pages/jobApplications/jobApplications";
import ApplicationDetails from "../pages/jobApplications/pages/applicationDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/applications",
        element: <Applications />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/login-as-company',
        element: <LoginAsCompany />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/signup-as-company',
        element: <CompanySignUp />
    },
    {
        path: '/signup-intro',
        element: <SignUpIntro />
    },
    {
        path: "/company/:id",
        element: <Company />
    },
    {
        path: '/company_profile',
        element: <CompanyProfile />
    },
    {
        path: '/explore',
        element: <Explore />
    },
    {
        path: '/job/:id/view',
        element: <ViewJob />
    },
    {
        path: '/job/:id/apply',
        element: <ApplyForJob />
    },
    {
        path: '/saved',
        element: <Saved />
    },
    {
        path: '/setting/career-interests',
        element: <CareerInteresting />
    },
    {
        path: '/setting/change-password',
        element: <ChangePassword />
    },
    {
        path: '/setting/delete-account',
        element: <DeleteAccount />
    },
    {
        path: '/setting/education-cv',
        element: <Education />
    },
    {
        path: '/setting/experience',
        element: <ExperiencePage />
    },
    {
        path: '/setting/general-info',
        element: <GeneralInfo />
    },
    {
        path: '/setting/online-presence',
        element: <SocialMedia />
    },
    {
        path: '/setting/public-profile',
        element: <PublicProfile />
    },
    {
        path: '/post_job/:func?/:id?',
        element: <PostJob />
    },
    {
        path: '/job_applications/:id?',
        element: <JobApplications />
    },
    {
        path: '/job_applications/details/:id?',
        element: <ApplicationDetails />
    }
]);