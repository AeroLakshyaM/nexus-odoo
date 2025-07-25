export async function uploadToCloudinary(file) {
  const url = "https://api.cloudinary.com/v1_1/djcgld75r/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "odoooo");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url;
}
