document.getElementById("checkCarbon").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => {
                    let productName = "";
                    let productPrice = "";

                    if (window.location.hostname.includes("amazon.in")) {
                        productName = document.getElementById("productTitle")?.innerText || "";
                        productPrice = document.querySelector(".a-price .a-offscreen")?.innerText || "";
                    }
                    else if (window.location.hostname.includes("flipkart.com")) {
                        productName = document.querySelector("span.B_NuCI")?.innerText || "";
                        productPrice = document.querySelector("div._30jeq3._16Jk6d")?.innerText || "";
                    }
                    else if (window.location.hostname.includes("myntra.com")) {
                        productName = document.querySelector("h1.pdp-title")?.innerText || "";
                        productPrice = document.querySelector("span.pdp-price")?.innerText || "";
                    }

                    return { productName, productPrice };
                }
            },
            (results) => {
                const data = results[0].result;
                let carbonFootprint = calculateCarbon(data.productPrice);
                document.getElementById("result").innerHTML = `
                    <strong>Product:</strong> ${data.productName} <br>
                    <strong>Price:</strong> ${data.productPrice} <br>
                    <strong>Estimated Carbon Footprint:</strong> ${carbonFootprint} kg CO₂
                `;
            }
        );
    });
});

// Simple carbon footprint calculator (1 rupee = 0.05 kg CO2 approx)
function calculateCarbon(priceText) {
    if (!priceText) return "N/A";

    let price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    if (isNaN(price)) return "N/A";

    return (price * 0.05).toFixed(2);
}
