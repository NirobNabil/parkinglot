import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* <h1>React Router Contacts</h1> */}
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a
                href={`/map`}
                style={{
                  border: "1px solid #a0e7e5",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                Bus Automation System
              </a>
            </li>
            <li>
              <a
                href={`/parking`}
                style={{
                  border: "1px solid #a0e7e5",
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                Parking lot Automation
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
