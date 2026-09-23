import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="page_404">
      <div className="not_found_container">

        {/* Animated 404 Background */}
        <div className="four_zero_four_bg">
          <h1>404</h1>
        </div>

        {/* Content */}
        <div className="content_box_404">
          <h2>Look like you're lost</h2>

          <p>
            The page you are looking for is not available!
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="link_404"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </section>
  );
};

export default NotFound;