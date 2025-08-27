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
import Grantee from "../pages/grantee/grantee";
import Oldgrantees from "../pages/oldgrantees/oldgrantees";
import LastSubscription from "../pages/lastSubscription/lastSubscription";
import UserProfile from "../pages/userProfile/userProfile";
import InvitePerson from "../pages/invitePerson/invitePerson";
import Invitations from "../pages/invitePerson/invitations";
import PricingPlan from "../pages/setting/pricing/pricingPlan";
import NotFound from "../pages/notfound/notfound";
import CompanyUsers from "../pages/companyUser/companyUser";
import CompanyJobs from "../pages/company_jobs/company_jobs";
import ContactSection from "../pages/contactus/contactUs";
import ErrorPage from "../pages/ErrorPage";
import Switcher from "../pages/switcher/switcher";

export const router = createBrowserRouter([
    {
        path: '*',
        errorElement: <ErrorPage />,
        element: <NotFound />,
    },
    {
        path: "/",
        element: <Home />, errorElement: <ErrorPage />,
    },
    {
        path: "/applications",
        element: <Applications />, errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <Login />, errorElement: <ErrorPage />
    },
    {
        path: '/login-as-company',
        element: <LoginAsCompany />, errorElement: <ErrorPage />
    },
    {
        path: '/profile',
        element: <Profile />, errorElement: <ErrorPage />
    },
    {
        path: '/sign',
        element: <Switcher />, errorElement: <ErrorPage />
    },
    {
        path: '/signup',
        element: <SignUp />, errorElement: <ErrorPage />
    },
    {
        path: '/signup-as-company',
        element: <CompanySignUp />, errorElement: <ErrorPage />
    },
    {
        path: '/signup-intro',
        element: <SignUpIntro />, errorElement: <ErrorPage />
    },
    {
        path: "/company/:id",
        element: <Company />, errorElement: <ErrorPage />
    },
    {
        path: '/company_profile',
        element: <CompanyProfile />, errorElement: <ErrorPage />
    },
    {
        path: '/explore',
        element: <Explore />, errorElement: <ErrorPage />
    },
    {
        path: '/job/:id/view',
        element: <ViewJob />, errorElement: <ErrorPage />
    },
    {
        path: '/job/:id/apply',
        element: <ApplyForJob />, errorElement: <ErrorPage />
    },
    {
        path: '/saved',
        element: <Saved />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/career-interests',
        element: <CareerInteresting />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/change-password',
        element: <ChangePassword />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/delete-account',
        element: <DeleteAccount />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/education-cv',
        element: <Education />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/experience',
        element: <ExperiencePage />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/general-info',
        element: <GeneralInfo />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/online-presence',
        element: <SocialMedia />, errorElement: <ErrorPage />
    },
    {
        path: '/setting/public-profile',
        element: <PublicProfile />, errorElement: <ErrorPage />
    },
    {
        path: '/post_job/:func?/:id?',
        element: <PostJob />, errorElement: <ErrorPage />
    },
    {
        path: '/job_applications/:id?',
        element: <JobApplications />, errorElement: <ErrorPage />
    },
    {
        path: '/job_applications/details/:id?',
        element: <ApplicationDetails />, errorElement: <ErrorPage />
    },
    {
        path: '/grantee',
        element: <Grantee />, errorElement: <ErrorPage />
    },
    {
        path: '/old-grantees',
        element: <Oldgrantees />, errorElement: <ErrorPage />
    },
    {
        path: '/last-Subscription',
        element: <LastSubscription />, errorElement: <ErrorPage />
    },
    {
        path: 'user/:id',
        element: <UserProfile />, errorElement: <ErrorPage />
    },
    {
        path: 'invite',
        element: <InvitePerson />, errorElement: <ErrorPage />
    },
    {
        path: 'invitations',
        element: <Invitations />, errorElement: <ErrorPage />
    },
    {
        path: 'company-users',
        element: <CompanyUsers />, errorElement: <ErrorPage />
    },
    {
        path: 'pricing',
        element: <PricingPlan />, errorElement: <ErrorPage />
    },
    {
        path: 'company_jobs',
        element: <CompanyJobs />, errorElement: <ErrorPage />
    },
    {
        path: 'contact-us',
        element: <ContactSection />, errorElement: <ErrorPage />
    },
    {
        path: '/error',
        element: <ErrorPage />, errorElement: <ErrorPage />
    }
]);