import "./style.css";

const WebsiteHeader = () => {
  return (
    <div className="header">
      <h3>NURUL YATEEM FOUNDATION</h3>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About us</a>
        </li>
        <li>
          <a href="/our-work">Our Work</a>
        </li>
        <li>
          <a href="/news">News</a>
        </li>
        <li>
          <a href="/contact">Contact Us</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="#" className="btn">
            Become A Sponsor
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WebsiteHeader;
