import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import DashboardLayout from "./DashboardLayout";
import Home from "./pages/default/Home/index";
import { styled } from "styled-components";
import { Theme } from "./types/default/types";
import About from "./pages/default/About";
import MyConference from "./pages/dashboard/Author/MyConference";
import AllConferences from "./pages/dashboard/Author/AllConferences";
import RegisterForm from "./pages/Form/registration";
import LoginForm from "./pages/Form/login";
import { ProjectsProvider } from "./context/ProjectsContext";
import ReviewerResponse from "./pages/dashboard/Author/Results";
import SubmittedConferences from "./pages/dashboard/Reviewer/SubmittedConferences";
import { GlobalStyle } from "./styles/globalStyle";
import useAuthentication from "./hooks/useAuthentication";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import AuthorNavbar from "./components/dashboard/Author/Navbar";
import AuthorSidebar from "./components/dashboard/Author/Sidebar";
import AdminSidebar from "./components/dashboard/Admin/Sidebar";
import CreateConference from "./pages/dashboard/Admin/CreateConference/index";
import ConfirmReview from "./pages/dashboard/Admin/ConfirmReview";
import Papers from "./pages/dashboard/Admin/Papers";
import ReviewerSidebar from "./components/dashboard/Reviewer/Sidebar";
import { Toaster } from "./components/ui/toaster";

const StyledMain = styled.main<{ theme: Theme }>`
  /* ${({ theme }) => theme.heights.footerHeight}; */
  height: ${({ theme }) => (theme.isUserLoggedIn ? "100vh" : "auto")};
  width: 100%;
  background-color: ${({ theme }) =>
    theme.isUserLoggedIn ? theme.dashboards.author.colors.primaryBG : ""};
  position: ${({ theme }) => (theme.isUserLoggedIn ? "relative" : "static")};
  display: flex;
`;

function App() {
  const authUser = useAuthentication();
  const { theme, updateTheme } = useTheme();
  const handleModeChange = () => {
    updateTheme((prevTheme) => ({
      ...prevTheme,
      isUserLoggedIn: authUser === null ? false : true,
    }));
  };
  useEffect(() => {
    handleModeChange();
  }, [authUser]);
  return (
    <>
      <ProjectsProvider>
        <GlobalStyle theme={theme} />
        <div className="flex w-full ">
          <Routes>
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/">
              <Route element={<DefaultLayout />} id="defaultRoute">
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Home />} />
                <Route path="/how-it-works" element={<Home />} />
              </Route>
            </Route>
            <>
              <Route
                path="/author-dashboard"
                element={
                  <DashboardLayout>
                    <AuthorNavbar />
                    <AuthorSidebar />
                  </DashboardLayout>
                }
                id="dashboardRoute"
              >
                <Route
                  path="/author-dashboard"
                  index
                  element={<MyConference />}
                />
                <Route
                  path="/author-dashboard/all-conferences"
                  element={<AllConferences />}
                />
                <Route
                  path="/author-dashboard/reviewer-response"
                  element={<ReviewerResponse />}
                />
              </Route>
            </>
            <Route
              path="/reviewer-dashboard"
              index
              element={
                <DashboardLayout>
                  <AuthorNavbar />
                  <ReviewerSidebar />
                  <SubmittedConferences />
                </DashboardLayout>
              }
            ></Route>
            <Route
              path="/admin-dashboard"
              element={
                <DashboardLayout>
                  <AuthorNavbar />
                  <AdminSidebar />
                </DashboardLayout>
              }
            >
              <Route
                path="/admin-dashboard"
                index
                element={<CreateConference />}
              />
              <Route path="/admin-dashboard/papers" element={<Papers />} />
              <Route
                path="/admin-dashboard/confirm-review"
                element={<ConfirmReview />}
              />
            </Route>
          </Routes>
        </div>
        <Toaster />
      </ProjectsProvider>
    </>
  );
}

export default App;
