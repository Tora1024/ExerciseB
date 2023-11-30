let sortOrder = 1;
let users = [];
const myUrl = "https://jsonplaceholder.typicode.com/users";

async function fetchData(url) {
    try {
      // Use the fetch API to make a GET request
      const response = await fetch(url);
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();

      // Return the parsed data
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }

function sortUsers(users, order) {
    // Check if the order is either 1 or -1
    if (order !== 1 && order !== -1) {
      console.error('Invalid order parameter. Please provide 1 for ascending or -1 for descending.');
      return users; // Return the original array if order is not valid
    }
  
    // Use the Array.prototype.sort method
    const sortedUsers = users.slice().sort((a, b) => {
      // Compare names based on the order parameter
      const nameA = a.name.toUpperCase(); // ignore case
      const nameB = b.name.toUpperCase();
  
      if (nameA < nameB) {
        return order;
      }
      if (nameA > nameB) {
        return -order;
      }
  
      return 0; // names are equal
    });
  
    return sortedUsers;
  }

function filterUsersByName(users, name) {
    // Use the Array.prototype.filter method
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  
    return filteredUsers;
  }

function displayData(tbody, users) {
  tbody.innerHTML = users
    .map(
      (user) => `
    <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
    </tr>
  `
    )
    .join("");
}

async function initializeApp() {
  const tbody = document.getElementById("table-body");
  const sortBtn = document.getElementById("sort");
  const nameFilter = document.getElementById("nameFilter");

  users = await fetchData(myUrl);
  displayData(tbody, users);

  // when a visitor click the sortBtn element, the users should be ordered ascending in the first click, and descending in the second click
  sortBtn.addEventListener("click", () => {
    const sortedUsers = sortUsers(users, sortOrder);
    sortOrder = -sortOrder;
    console.log(sortOrder);
    displayData(tbody, sortedUsers);
  });

  // when a visitor fill the name in the nameFilter element, the table should only show users asociated to this name
  nameFilter.addEventListener("input", () => {
    const inputValue = nameFilter.value.trim(); // Get the trimmed input value

    // Assuming 'users' is the array of user objects
    const filteredUsers = filterUsersByName(users, inputValue);

    displayData(tbody, filteredUsers);
  });
}

if (typeof document !== "undefined") {
  initializeApp();
}

module.exports = { fetchData, sortUsers, filterUsersByName, displayData };
initializeApp();

