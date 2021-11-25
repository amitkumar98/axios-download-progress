import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

function App() {
  const [download, setDownload] = useState(false);
  const [progress, setProgress] = useState(0);
  const getDownloadPercentage = (loaded, total) =>
    Math.round((loaded * 100) / total);

  const handleDownloadClick = () => {
    axios({
      method: "GET",
      url: "https://file-examples-com.github.io/uploads/2017/02/zip_10MB.zip",
      responseType: "blob",
      onDownloadProgress: (ProgressEvent) => {
        setDownload(true);
        setProgress(
          getDownloadPercentage(ProgressEvent.loaded, ProgressEvent.total)
        );
        console.log("Download Progress: ", ProgressEvent);
        if (ProgressEvent.loaded === ProgressEvent.total) {
          setDownload(false);
        }
      },
    }).then((res) => {
      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Sample_Download.zip";
      a.click();
      a.remove();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {download ? (
          <div>
            <CircularProgress
              color="inherit"
              variant="determinate"
              value={progress}
            />
          </div>
        ) : (
          <div className="download-button" onClick={handleDownloadClick}>
            Download Sample Zip
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
