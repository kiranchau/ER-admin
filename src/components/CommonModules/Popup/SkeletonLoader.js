import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = (props) => {
  const [headingSet, setHeadingsData] = useState();
  const [tableNameSet, setTableName] = useState("");

  useEffect(() => {
    setHeadingsData(props.headings);
    setTableName(props.tableName);
  }, [headingSet, tableNameSet]);

  //Heading Set
  const getHeader = () => {
    return headingSet?.map((key) => (
      <th key={key.id}>
        <Skeleton />
      </th>
    ));
  };

  // Table Body Set
  const tableBody = () => {
    const rows = [];
    for (let i = 0; i < 15; i++) {
      rows.push(
        <tr key={i}>
          {headingSet?.map((key) => (
            <td key={key.id}>
              <Skeleton />
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="w-full">
      {/* Table Upper Side Button */}
      <table className="w-full text-left">
        <thead>
          {/* Heading Setup */}
          <tr>{getHeader()}</tr>
        </thead>
        <tbody>
          {/* Table Data Setup */}
          {tableBody()}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonLoader;
