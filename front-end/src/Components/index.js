export async function fetchListOfStudents() {
    try {
      let response = await fetch(
        `http://localhost:3001/students`,
        {
          method: "GET"
          
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        return data;

      } else {
        return ({
            status: response.status,
            error: data
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function createStudent(post) {
      console.log(post)
    try {
      let response = await fetch(
        `http://localhost:3001/students/`,
        
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        console.log(response);
        return "Something went wrong";
      }
    } catch (error) {
      console.log(error);
    }
  }