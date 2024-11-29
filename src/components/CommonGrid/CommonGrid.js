import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../components/SCSS/commongrid.scss";
import Button from "../UI/Button";

import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaRemoveFormat,
  FaTrash,
} from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import * as TiIcons from "react-icons/ti";
import * as RiIcons from "react-icons/ri";
import TableButton from "../UI/TableButton";
import * as api from "../../API/authCrud";
import { useNavigate } from "react-router-dom";
import UseFormContext from "../../context/UseFormContext";

const CommonGrid = (props) => {
  const formContext = UseFormContext();
  const navigate = useNavigate();
  const [headingSet, setHeadingsData] = useState();
  const [dataSet, setData] = useState([]);
  const [tableNameSet, setTableName] = useState("");
  const [api_arrSet, setApi_arr] = useState([]);
  const [column_id, setColoumn_id] = useState(null);
  const [searchflag, setSearchFlag] = useState(false);
  const [search_Array, setSearch_Array] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [initialpage, setInitialPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedEntry, setSelectedEntry] = useState(10);
  const [pageCountSet, setPageCount] = useState();
  const [showEntries, setShowEntries] = useState([
    { name: "10" },
    { name: "25" },
    { name: "50" },
    { name: "All" },
  ]);

  useEffect(() => {
    setData(props.rewardsData);
    setTableName(props.tableName);
    setHeadingsData(props.headings);
    setApi_arr(props.rewardsData);
  }, [tableNameSet, headingSet, api_arrSet]);

  useEffect(() => {
    const slice = api_arrSet.slice(initialpage, initialpage + perPage);
    setData(slice);
    setPageCount(Math.ceil(api_arrSet.length / perPage));
  }, [pageCountSet]);

  //Paginations Records
  const handlePageChange = (pageNumber) => {
    var i;
    const selectedPage = pageNumber.selected;
    setPageNumber(selectedPage);
    const finalperPage = pageNumber.selected + 1;
    var temp = [];
    if (searchflag) {
      temp = search_Array;
    } else {
      temp = api_arrSet;
    }
    var slice = [];
    const final = selectedPage * perPage;
    if (selectedPage !== 0) {
      for (i = 0; i < final; i++) {
        slice = temp.slice(final, finalperPage * perPage);
      }
    } else {
      for (i = 0; i < perPage; i++) {
        slice = temp.slice(initialpage, initialpage + perPage);
      }
    }
    // this.setState({ dataSet: slice }, () => { });
    setData(slice);
  };

  //Heading Set
  const getHeader = () => {
    return headingSet?.map((key) => {
      const formattedName = key.Name.replace(/([A-Z])/g, " $1").trim();
      return (
        <th key={key.id.toString()}>
          <span>
            {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}
          </span>
        </th>
      );
    });
  };

  const changeCustStatus = (data) => {
    const { id, Organization, PhoneNo, Email, Status, Address } = data;
    const change = !Status; // Toggle the status

    const dataChange = {
      org_name: Organization,
      phone_number: PhoneNo,
      email: Email,
      is_active: change,
      address: Address,
    };

    api
      .custStatusChange(dataChange, data.id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.is_active === false) {
            formContext.setNotifayMessage("Customer is Inactive");
            formContext.setNotifayType("success");
          } else {
            formContext.setNotifayMessage("Customer is Active");
            formContext.setNotifayType("success");
          }
          // Update the local data state to reflect the change
          setData((prevData) => {
            return prevData.map((cust) => {
              if (cust.id === id) {
                return { ...cust, Status: change }; // Update Status property
              }
              return cust;
            });
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
        formContext.setNotifayMessage("Error updating customer status");
        formContext.setNotifayType("error");
      });
  };

  const changeUserStatus = (data) => {
    const { id, UserName, Email, Password, Status, role_id } = data;
    const nameParts = UserName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1];
    const change = !Status; // Toggle the status

    const dataChange = {
      first_name: firstName,
      last_name: lastName,
      emailid: Email,
      password: Password,
      is_active: change,
      role_id,
    };

    api
      .userStatusChange(dataChange, data.id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.is_active === false) {
            formContext.setNotifayMessage("User is Inactive");
            formContext.setNotifayType("success");
          } else {
            formContext.setNotifayMessage("User is Active");
            formContext.setNotifayType("success");
          }
          // Update the local data state to reflect the change
          setData((prevData) => {
            return prevData.map((user) => {
              if (user.id === id) {
                return { ...user, Status: change }; // Update Status property
              }
              return user;
            });
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
        formContext.setNotifayMessage("Error updating user status");
        formContext.setNotifayType("error");
      });
  };

  const deleteRecord = (tableName, id) => {
    if (tableName == "User List") {
      api
        .userDeleteRecord(id)
        .then((res) => {
          if (res.status == 204) {
            setData(dataSet.filter((item) => item.id !== id));
            formContext.setNotifayMessage("Record deleted successfully.");
            formContext.setNotifayType("success");
          } else {
            formContext.setNotifayMessage("Record not deleted successfully.");
            formContext.setNotifayType("error");
          }
        })
        .catch((err) => {
          formContext.setNotifayMessage("Record not deleted successfully.");
          formContext.setNotifayType("error");
        });
    } else if (tableName == "Customer List") {
      api
        .custDeleteRecord(id)
        .then((res) => {
          if (res.status == 204) {
            setData(dataSet.filter((item) => item.id !== id));
            formContext.setNotifayMessage("Record deleted successfully.");
            formContext.setNotifayType("success");
          } else {
            formContext.setNotifayMessage("Record not deleted successfully.");
            formContext.setNotifayType("error");
          }
        })
        .catch((err) => {
          formContext.setNotifayMessage("Record not deleted successfully.");
          formContext.setNotifayType("error");
        });
    }
  };

  const editRecord = (tableName, id) => {
    if (tableName === "User List") {
      props.parentCallback(id);
    } else if (tableName === "Customer List") {
      props.parentCallback(id);
    }
  };

  // Table Data set
  const tableBody = () => {
    // Check if dataSet is not yet defined or empty
    if (!dataSet || dataSet.length === 0) {
      return (
        <tr>
          <td colSpan={headingSet ? headingSet.length + 1 : 1}>
            No Data Available.
          </td>
        </tr>
      );
    } else {
      return dataSet?.map((res) => (
        <tr key={res.id}>
          <RenderRow
            customerStatus={(e) => {
              changeCustStatus(e);
            }}
            userStatusChange={(e) => {
              changeUserStatus(e);
            }}
            key={res.id}
            data={res}
            keys={headingSet}
            tableName={tableNameSet}
          />
          {/* Table Column Button */}
          {(tableNameSet !== "Customer List" &&
            tableNameSet !== "User List" &&
            tableNameSet !== "Report List" &&
            tableNameSet !== "Connections" &&
            tableNameSet !== "Master Data") || (
            <td>
              <TableButton>
                <TiIcons.TiEdit
                  title="Edit"
                  onClick={() => {
                    editRecord(tableNameSet, res.id);
                  }}
                />
              </TableButton>
              <TableButton>
                <RiIcons.RiDeleteBin6Line
                  title="Delete"
                  onClick={() => deleteRecord(tableNameSet, res.id)}
                />
              </TableButton>
            </td>
          )}
        </tr>
      ));
    }
  };

  return (
    <div>
      {/* Table Heading Name */}

      <div className="w-full">
        {/* Table Upper Side Button */}
        <table className="w-full text-left">
          <thead>
            {/* Heading Setup */}
            <tr>
              {getHeader()}
              {(tableNameSet !== "Customer List" &&
                tableNameSet !== "User List" &&
                tableNameSet !== "Report List" &&
                tableNameSet !== "Connections" &&
                tableNameSet !== "Master Data") ||
                tableNameSet === "DashCust" ||
                tableNameSet === "DashServ" || <th>{"Action"}</th>}
            </tr>
          </thead>
          <tbody>
            {/* Table Data Setup */}
            {tableBody()}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center absolute bottom-1 w-full">
        {/* Pagination Setup */}
        {(tableNameSet !== "Customer List" &&
          tableNameSet !== "User List" &&
          tableNameSet !== "Report List" &&
          tableNameSet !== "Connections" &&
          tableNameSet !== "Master Data") ||
          tableNameSet === "DashCust" ||
          tableNameSet === "DashServ" || (
            <nav
              aria-label="Page navigation example"
              className="pagination-bottom"
            >
              {api_arrSet.length !== 0 && (
                <span>
                  <ReactPaginate
                    initialPage={pageNumber}
                    forcePage={pageNumber}
                    previousClassName={"glyphicon glyphicon-menu-left"}
                    previousLabel={<FaChevronLeft title="Previous" />}
                    nextLabel={<FaChevronRight title="Next" />}
                    nextClassName={"glyphicon glyphicon-menu-right"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCountSet}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={($event) => handlePageChange($event)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                  />
                </span>
              )}
            </nav>
          )}
      </div>
    </div>
  );
};

const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    if (props.tableName === "Customer List" && index + 1 === 4) {
      return (
        <td>
          <label className="switch">
            <input
              type="checkbox"
              checked={props.data.Status ? true : false}
              onChange={() => props.customerStatus(props.data)}
            />
            <span className="slider round"></span>
          </label>
        </td>
      );
    } else if (props.tableName === "DashCust" && index + 1 === 4) {
      return (
        <td>
          <label className="switch">
            <input
              type="checkbox"
              checked={props.data.Status ? true : false}
              onChange={() => props.customerStatus(props.data)}
            />
            <span className="slider round"></span>
          </label>
        </td>
      );
    } else if (props.tableName === "User List" && index + 1 === 3) {
      return (
        <td>
          <label className="switch">
            <input
              type="checkbox"
              checked={props.data.Status ? true : false}
              onChange={() => props.userStatusChange(props.data)}
            />
            <span className="slider round"></span>
          </label>
        </td>
      );
    } else if (props.tableName === "DashServ" && index + 1 === 3) {
      return (
        <td>
          <label className="switch">
            <input
              type="checkbox"
              checked={props.data.Status ? true : false}
              onChange={() => props.userStatusChange(props.data)}
            />
            <span className="slider round"></span>
          </label>
        </td>
      );
    } else {
      return props.data[key.Name] != undefined ||
        props.data[key.Name] != null ? (
        <td key={props.data[key.Name]}>{String(props.data[key.Name])}</td>
      ) : (
        <td>-</td>
      );
    }
  });
};

export default CommonGrid;
