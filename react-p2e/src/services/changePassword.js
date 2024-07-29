const changePassword = async (formData) => {
    const token = localStorage.getItem("access_token"); // Retrieve token from local storage
    if (!token) { 
        throw new Error("Token not found in local storage");
    }
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }
  
      // Password changed successfully
      return true;
    } catch (error) {
      // Handle network errors or other exceptions
      throw new Error(error.message || "Failed to change password");
    }
  };
  
  export default changePassword;
  