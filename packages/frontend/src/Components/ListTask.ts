export async function fetchTasks() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task`);
        if (response.ok) {
            const data = await response.json();
            return data; // Return the fetched data
        } else {
            console.error("Failed to fetch tasks");
            return []; // Return an empty array in case of an error
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return []; // Return an empty array in case of an error
    }
}
