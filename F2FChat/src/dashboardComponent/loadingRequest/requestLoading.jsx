import "./requestLoading.css";
export default function RequestLoading() {
  return (
    <>
      <div>
        <small>sending request...</small>
        <div className="loading-container">
          <p className="loading"></p>
        </div>
      </div>
    </>
  );
}
