import request from "@/utils/request";

const FileAPI = {
  /** 上传文件（传入 File） */
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, FileInfo>({
      url: "/api/v1/files",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default FileAPI;

export interface FileInfo {
  name: string;
  url: string;
}
