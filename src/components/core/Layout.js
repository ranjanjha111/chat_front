import React from "react";
import Menu from "./Menu";
// import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <React.Fragment>
        <Menu />
        {/* <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div> */}
        <div className={className} style={{paddingTop: '25px'}}>{children}</div>
    </React.Fragment>
);

// const Layout = ({ className, children}) => (
//     <React.Fragment>
//         <Menu />
//         <div className={className}>{children}</div>
//     </React.Fragment>
// );

export default Layout;
