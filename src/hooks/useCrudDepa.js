const apiUrl = import.meta.env.VITE_URL_API;

function useCrudDepa() {
    const deleteDepa = async (id) => {
      try {
        const res = await fetch(apiUrl + `/api/depa/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          },
        });
  
        // Convierte la respuesta a JSON
        const data =  res;
        console.log(data)
        // Retorna la respuesta para que pueda ser utilizada
        return data;
      } catch (error) {
        console.error(error);
        return null; // Retorna null en caso de error
      }
    };
  
    return { deleteDepa };
  }
  
export default useCrudDepa;