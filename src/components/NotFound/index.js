import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png "
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-descripton">
      We are Sorry,the page your requested could not be found
    </p>
  </div>
);

export default NotFound;
