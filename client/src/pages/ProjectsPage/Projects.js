import React, { useState, useEffect } from "react";
import "../../App.css";
import { FilterOutlined } from "@ant-design/icons";
import CardList from "./CardList";
import "./index.css";
import {
  Input,
  Button,
  Space,
  Card,
  Pagination,
  Checkbox,
  Breadcrumb,
} from "antd";
import { useLocation, useParams, useNavigate } from "react-router-dom";
const { Search } = Input;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState({
    year: [],
    category: [],
    partnerType: [],
  });
  const location = useLocation();
  const { page } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = queryParams.get("page")
    ? parseInt(queryParams.get("page"), 10)
    : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [intermediateFilterValues, setIntermediateFilterValues] =
    useState(filterValues);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState({
    year: {},
    category: {},
    partnerType: {},
  });
  const updateProjectViews = (projectId, views) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, views: views } : project
      )
    );
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = async (value) => {
    try {
      setSearchTerm(value);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (filterType, value, checked) => {
    let newValues = [...filterValues[filterType]];
    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter((v) => v !== value);
    }
    setFilterValues((prevValues) => ({
      ...prevValues,
      [filterType]: newValues,
    }));
    setCurrentPage(1);
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    let newValues = [...intermediateFilterValues[filterType]];

    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter((v) => v !== value);
    }

    setIntermediateFilterValues((prevValues) => ({
      ...prevValues,
      [filterType]: newValues,
    }));

    setCurrentPage(1);
    setCheckedStatus((prevStatus) => ({
      ...prevStatus,
      [filterType]: {
        ...prevStatus[filterType],
        [value]: checked,
      },
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setFilterValues(intermediateFilterValues);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchFilteredProjects() {
      try {
        let params = new URLSearchParams();
        for (const key in filterValues) {
          if (filterValues[key]?.length > 0) {
            params.append(key, filterValues[key]);
          }
        }
        if (searchTerm) {
          params.append("title", searchTerm);
        }
        const response = await fetch(
          `http://51.142.109.141/api/projects?${params.toString()}`
        );
        const data = await response.json();
        console.log("Data fetched from API:", data);
        const filteredData = data.filter(
          (project) =>
            project.publish === undefined ||
            project.publish.toLowerCase() === "true"
        );
        console.log("Filtered published projects:", filteredData);
        setProjects(filteredData);
        const loadedCheckedStatus = JSON.parse(
          localStorage.getItem("checkedStatus")
        );
        if (loadedCheckedStatus) {
          setCheckedStatus(loadedCheckedStatus);
          setIntermediateFilterValues(loadedCheckedStatus);
          setFilterValues(loadedCheckedStatus);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFilteredProjects();
  }, [filterValues, searchTerm]);

  useEffect(() => {
    const filteredProjects = projects
      .filter((project) => {
        const isYearMatch =
          filterValues.year?.length === 0 ||
          filterValues.year.includes(project.year.toString());
        const isTypeMatch =
          filterValues.category?.length === 0 ||
          filterValues.category.some((filterCategory) => {
            if (filterCategory === "both") {
              return (
                project.category === "web" || project.category === "mobile"
              );
            } else {
              return (
                project.category === filterCategory ||
                project.category === "both"
              );
            }
          });
        const isPartnersMatch =
          filterValues.partnerType?.length === 0 ||
          filterValues.partnerType.some((partnerType) =>
            project.partnerType.includes(partnerType)
          );
        return isYearMatch && isTypeMatch && isPartnersMatch;
      })
      .filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setFilteredProjects(filteredProjects);
    setTotalItems(filteredProjects.length);
  }, [filterValues, searchTerm, projects]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page")) || 1;
    setCurrentPage(page);
  }, [location]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className="content">
      <div className="title"></div>
      <div className="search-and-filter">
        <div
          className="search-projects"
          style={{ justifyContent: "flex-end", paddingRight: "20px" }}
        >
          <Space direction="vertical">
            <Search
              className="search"
              placeholder="Search projects"
              allowClear
              size="middle"
              onSearch={handleSearch}
            />
          </Space>
        </div>
        <div className="filters" onClick={toggleForm}>
          <FilterOutlined style={{ paddingRight: "8px" }} /> Filter
        </div>
      </div>

      <div className="display-flex">
        {showForm && (
          <form className="filter-form" onSubmit={applyFilters}>
            <div className="form-row">
              <div className="column">
                <label>Year:</label>
                <div className="checkboxes">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="2023"
                      name="year"
                      value="2023"
                      checked={checkedStatus.year["2023"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "year",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="year">2023</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="2022"
                      name="year"
                      value="2022"
                      checked={checkedStatus.year["2022"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "year",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="year">2022</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="2021"
                      name="year"
                      value="2021"
                      checked={checkedStatus.year["2021"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "year",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="year">2021</label>
                  </div>
                </div>
              </div>

              <div className="column">
                <label>Type:</label>
                <div className="checkboxes">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="web"
                      name="category"
                      value="web"
                      checked={checkedStatus.category["web"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "category",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="web">Web App</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="mobile"
                      name="category"
                      value="mobile"
                      checked={checkedStatus.category["mobile"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "category",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="mobile">Mobile App</label>
                  </div>
                </div>
              </div>

              <div className="column">
                <label>Partners:</label>
                <div className="checkboxes">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="university"
                      name="partnerType"
                      value="University"
                      checked={checkedStatus.partnerType["University"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "partnerType",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="university">University</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="healthcare"
                      name="partnerType"
                      value="Health Care"
                      checked={
                        checkedStatus.partnerType["Health Care"] || false
                      }
                      onChange={(e) =>
                        handleCheckboxChange(
                          "partnerType",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="healthcare">Health Care</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="charity"
                      name="partnerType"
                      value="Charity"
                      checked={checkedStatus.partnerType["Charity"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "partnerType",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="charity">Charity</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="company"
                      name="partnerType"
                      value="Company"
                      checked={checkedStatus.partnerType["Company"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "partnerType",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="company">Company</label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="others"
                      name="partnerType"
                      value="Others"
                      checked={checkedStatus.partnerType["others"] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "partnerType",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="others">Others</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <button
                className="apply-btn"
                type="submit"
                style={{ backgroundColor: "purple" }}
              >
                Apply
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="Projects">
        <CardList
          projects={currentProjects}
          searchTerm={searchTerm}
          filterValues={filterValues}
          currentPage={currentPage}
          updateProjectViews={updateProjectViews}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginBottom: "20px",
            marginRight: "33px",
          }}
        >
          <Pagination
            className="pagination"
            pageSize={pageSize}
            current={currentPage}
            total={totalItems}
            showTotal={(total) => `Total ${total} projects`}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
