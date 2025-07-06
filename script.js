const mainHeader = document.getElementById("main-header");
const navLinks = document.querySelectorAll("#navigation-menu a");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
const logo = document.querySelector("#main-header .text-3xl");
const logoSpan = document.querySelector("#main-header .text-blue-300");

// Ensure mobile menu links also change color correctly when opened
mobileMenuButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("hidden")) {
        // Menu is about to be shown, links should be gray as background is white
        mobileMenuLinks.forEach((link) =>
            link.classList.replace("text-white", "text-gray-700")
        );
    } else {
        // Menu is about to be hidden, ensure links are correct for header state
        if (window.scrollY > 50) {
            mobileMenuLinks.forEach((link) =>
                link.classList.replace("text-white", "text-gray-700")
            );
        } else {
            mobileMenuLinks.forEach((link) =>
                link.classList.replace("text-gray-700", "text-white")
            );
        }
    }
});

// ... (your header/menu code remains unchanged)

// Function to fetch data from SerpApi
async function fetchApiData() {
    const apiDataContainer = document.getElementById("api-data-container");
    apiDataContainer.innerHTML =
        '<p class="col-span-full text-center text-indigo-500 text-xl animate-pulse"><i class="fas fa-spinner fa-spin mr-2"></i>Loading incredible destinations...</p>';

    try {
        const response = await fetch("https://my-json-server.typicode.com/paavangpt/travel-destinations/destinations/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        apiDataContainer.innerHTML = "";

        let itemsToDisplay = data;

        if (itemsToDisplay.length > 0) {
            // Render fetched data (limiting to 6 for display consistency)
            itemsToDisplay.slice(0, 4).forEach((item) => {
                const card = document.createElement("article");
                card.className =
                    "api-data-card transform hover:scale-105 transition duration-300 ease-in-out border border-gray-200 rounded-lg drop-shadow-xl overflow-hidden";
                card.innerHTML = `
                    <img src="${
                        item.thumbnail ||
                        "https://placehold.co/400x300/e0e0e0/333333?text=No+Image"
                    }" 
                         alt="${item.title || "Destination"}" 
                         class="w-full h-48 object-cover ">
                         <div class="p-4">
                    <h3 class="text-xl font-semibold mb-3 text-indigo-800">${
                        item.title || "Unknown Destination"
                    }</h3>
                    <p class="text-gray-700 leading-relaxed">${
                        item.description
                            ? item.description.substring(0, 100) + "..."
                            : "No description available."
                    }</p>
                    <div class="mt-2 text-sm text-gray-600">
                        ${
                            item.flight_price
                                ? `<span class="mr-4"><i class="fas fa-plane-departure mr-1"></i>Flight: ${item.flight_price}</span>`
                                : ""
                        }
                        ${
                            item.hotel_price
                                ? `<span><i class="fas fa-hotel mr-1"></i>Hotel: ${item.hotel_price}</span>`
                                : ""
                        }
                    </div>
                    <a href="${
                        item.link || "#"
                    }" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800 mt-4 inline-block font-medium text-lg">View Details <i class="fas fa-arrow-right ml-2 text-base"></i></a><div>
                `;
                apiDataContainer.appendChild(card);
            });
        } else {
            apiDataContainer.innerHTML =
                '<p class="col-span-full text-center text-gray-500 text-xl"><i class="fas fa-info-circle mr-2"></i>No destinations found from the API.</p>';
        }
    } catch (error) {
        console.error("Error fetching API data:", error);
        apiDataContainer.innerHTML =
            '<p class="col-span-full text-center text-red-500 text-xl"><i class="fas fa-exclamation-circle mr-2"></i>Failed to load destinations. Please try again later.</p>';
    }
}

// Fetch API data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchApiData);
