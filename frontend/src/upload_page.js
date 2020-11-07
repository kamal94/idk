import React, { useState } from "react";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { CreateModel, PostModelUploadURL } from "./api";

const uppy = new Uppy({
  meta: { type: "avatar" },
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: [".7z", ".zip", ".gz"],
  },
  autoProceed: false,
});

uppy.use(AwsS3, {
  getUploadParameters(file) {
    const body = {
      filename: file.name,
      contentType: file.type,
    };
    return PostModelUploadURL(body).then((response) => {
      // Return an object in the correct shape.
      return {
        method: "PUT",
        url: response.data.url,
        fields: [],
        // Provide content type header required by S3
        headers: {
          "Content-Type": "application/octet-stream",
        },
      };
    });
  },
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

uppy.on("file-added", (file) => {
  file.original_name = file.name;
  file.name = uuidv4();
  console.log("Added file", file);
});
uppy.on("upload-success", (file, response) => {
  console.log(file);
  console.log(response);
  var file_location = response.uploadURL.split("/").pop();
  console.log("file location:", file_location);
  CreateModel({
    address: file.name,
    name: file.original_name,
    size: file.size,
  });
});

function UploadDashboard() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Dashboard
        uppy={uppy}
        // plugins={['Webcam']}
        width={500}
        height={500}
        showProgressDetails={true}
        theme="auto"
      />
    </div>
  );
}
export { UploadDashboard };
