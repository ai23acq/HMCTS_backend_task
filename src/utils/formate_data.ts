export const FormateData = (data: any): Promise<{ data: any }> => {
    return new Promise((resolve, reject) => {
      if (data) {
        resolve({ data });
      } else {
        reject(new Error("Data Not found!"));
      }
    });
};