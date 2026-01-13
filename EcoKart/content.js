// Function to get product name and price
function getProductInfo() {
    let productName = "";
    let productPrice = "";

    // Amazon
    if (window.location.hostname.includes("amazon.in")) {
        productName = document.getElementById("productTitle")?.innerText || "";
        productPrice = document.querySelector(".a-price .a-offscreen")?.innerText || "";
    }

    // Flipkart
    else if (window.location.hostname.includes("flipkart.com")) {
        productName = document.querySelector("span.B_NuCI")?.innerText || "";
        productPrice = document.querySelector("div._30jeq3._16Jk6d")?.innerText || "";
    }

    // Myntra
    else if (window.location.hostname.includes("myntra.com")) {
        productName = document.querySelector("h1.pdp-title")?.innerText || "";
        productPrice = document.querySelector("span.pdp-price")?.innerText || "";
    }

    return { productName, productPrice };
}

// Send product info to popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProduct") {
        sendResponse(getProductInfo());
    }
});
