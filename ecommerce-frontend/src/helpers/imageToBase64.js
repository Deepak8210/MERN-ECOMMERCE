export const imageToBase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  const convertedData = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
  return convertedData;
};
