import React, { Component } from "react"
import { Router, Routes, Route, Link, NavLink } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import AuthService from "./services/auth.service"

//components
// Public
import Home from "./pages/HomePage/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AboutUs from "./pages/AboutUs"
import Event from './pages/EventPage/Event'
import Projects from './pages/ProjectsPage/Projects'
import Footer from "./components/Footer.js/Footer"
import ShowCaseProjects from './pages/video/ShowCaseProject'
import ShowCaseEvent from './pages/ShowCaseEvent'
import ShowCaseNews from './pages/ShowCaseNews'
import WorkWithUs from "./pages/WorkWithUs"
import Error from "./components/error.component"

// User
import NewProposal from "./pages/NewProposal/NewProposal"
import OrgInfo from "./components/orginfo.component"
import OrgInfoEdit from "./pages/OrgInfoEdit/OrgInfoEdit"
import AddOrgInfo from "./pages/AddOrgInfo/AddOrgInfo"
import EditProposal from "./pages/EditProposals/EditProposal"

// Admin
import AdminProposals from "./pages/AdminProposals"
import AdminProjects from "./pages/AdminProjects"
import WebsiteEditing from './pages/WebsiteEditing'
import AdminEvents from './pages/WebsiteEditing/Events'
import AdminNews from './pages/WebsiteEditing/News'


import EventBus from "./common/EventBus"
import UserProposals from "./pages/UserProposals"
import EditProject from "./pages/admin/pages/Projects/EditProject/index"
import AddProject from "./pages/admin/pages/Projects/AddProject/index"
import RespondProposals from "./pages/admin/pages/Proposals/Response/index"
import EditEvent from "./pages/admin/pages/WebsiteEditing/Events/EditEvents/index"
import AddEvent from "./pages/admin/pages/WebsiteEditing/Events/AddEvents/index"
import EditNews from "./pages/admin/pages/WebsiteEditing/News/EditNews/index"
import AddNews from "./pages/admin/pages/WebsiteEditing/News/AddNews/index"
import Proposals from "./pages/admin/pages/Proposals/index"
import AProjects from "./pages/admin/pages/Projects/index"
import AWebsiteEditing from "./pages/admin/pages/WebsiteEditing/index"
import Events from "./pages/admin/pages/WebsiteEditing/Events/index"
import News from "./pages/admin/pages/WebsiteEditing/News/index"
import AWorkWithUs from "./pages/admin/pages/WebsiteEditing/WorkWithUs/index"
import AAboutUs from "./pages/admin/pages/WebsiteEditing/AboutUs/index"
class App extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    }
  }

  componentDidMount () {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      })
    }

    EventBus.on("logout", () => {
      this.logOut()
    })
  }

  componentWillUnmount () {
    EventBus.remove("logout")
  }

  logOut () {
    AuthService.logout()
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    })
  }

  render () {
    const { currentUser, showAdminBoard } = this.state

    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: "black" }}
        >
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand">
              <img
                src={require("../src/img/ucl-logo.png")}
                alt="logo"
                style={{ height: "20px", marginTop: "-8px" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav mr-auto">
                {/* public */}
                {!showAdminBoard && !currentUser && (
                  <>
                    <NavLink
                      exact
                      to={"/home"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      HOME
                    </NavLink>
                    <NavLink
                      to={"/all-projects"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      PROJECTS
                    </NavLink>
                    <NavLink
                      to={"/events"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      EVENTS & NEWS
                    </NavLink>
                    <NavLink
                      to={"/workwithus"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      WORK WITH US
                    </NavLink>
                    <NavLink
                      to={"/aboutus"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      ABOUT US
                    </NavLink>
                  </>
                )}
                {/* admin */}
                {showAdminBoard && (
                  <>
                    <NavLink
                      to={"/admin/proposals"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      PROPOSALS
                    </NavLink>
                    <NavLink
                      to={"/admin/projects"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      PROJECTS
                    </NavLink>
                    <NavLink
                      to={"/admin/websiteEditing"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      WEBSITE EDITING
                    </NavLink>
                  </>
                )}
                {/* user */}
                {currentUser && !showAdminBoard && (
                  <>
                    <NavLink
                      to={"/user-proposals"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      PROPOSALS
                    </NavLink>
                  </>
                )}
              </div>
              {currentUser && !showAdminBoard ? ( //User
                <div className="navbar-nav ml-auto">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </div>
              ) : currentUser && showAdminBoard ? ( //Admin
                <div className="navbar-nav ml-auto">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="home-container">
          {/* public */}
          {!showAdminBoard && !currentUser ? (
            <>
              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route exact path="/events" element={<Event />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/workwithus" element={<WorkWithUs />} />
                <Route exact path="/all-projects" element={<Projects />} />
                <Route
                  exact
                  path="/projects/:id"
                  element={<ShowCaseProjects />}
                />
                <Route path="/all-projects?page=:page" component={Projects} />
                <Route
                  path="/projects/:id?page=:page"
                  component={ShowCaseProjects}
                />
                {/* <Route exact path="/showcaseevent" element={<ShowCaseEvent />} /> */}
                <Route
                  path="/showcaseevent/:eventId"
                  element={<ShowCaseEvent />}
                />
                <Route
                  path="/showcasenews/:newsId"
                  element={<ShowCaseNews />}
                />
                <Route path="*" element={<Error />}></Route>
              </Routes>
            </>
          ) : currentUser && !showAdminBoard ? (
            <>
              <Routes>
                <Route path="*" element={<Error />}></Route>
                <Route exact path="/profile" element={<OrgInfo />} />
                <Route
                  exact
                  path="/user-proposals"
                  element={<UserProposals />}
                />
                <Route exact path="/editproposal/*" element={<EditProposal />} />
                <Route exact path="/new-proposal" element={<NewProposal />} />
                <Route exact path="/orginfo-edit" element={<OrgInfoEdit />} />
                <Route exact path="/orginfo-add" element={<AddOrgInfo />} />
              </Routes>
            </>
          ) : showAdminBoard ? (
            <>
              <Routes>
                <Route path="*" element={<Error />}></Route>
                <Route
                  exact
                  path="/admin-proposals"
                  element={<AdminProposals />}
                />
                <Route
                  exact
                  path="/admin-projects"
                  element={<AdminProjects />}
                />
                <Route
                  exact
                  path="/website-editing"
                  element={<WebsiteEditing />}
                />

                <Route exact path="/AdminEvents" element={<AdminEvents />} />
                <Route exact path="/AdminNews" element={<AdminNews />} />

                <Route
                  path="admin/*"
                >
                  <Route path="editProject/*" element={<EditProject />} />
                  <Route path="addProject" element={<AddProject />} />
                  <Route
                    path="respondProposals/*"
                    element={<RespondProposals />}
                  />

                  <Route path="editEvent/*" element={<EditEvent />} />
                  <Route path="addEvent" element={<AddEvent />} />

                  <Route path="editNews/*" element={<EditNews />} />
                  <Route path="addNews" element={<AddNews />} />

                  <Route path="proposals" element={<Proposals />}></Route>
                  <Route path="projects" element={<AProjects />}></Route>
                  <Route path="websiteEditing" element={<AWebsiteEditing />}>
                    <Route index element={<Events />} />
                    <Route path="news" element={<News />} />
                    <Route path="workWithUs" element={<AWorkWithUs />} />
                    <Route path="aboutUs" element={<AAboutUs />} />
                  </Route>
                </Route>
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          )}
        </div>

        <Footer />

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    )
  }
}

export default App
