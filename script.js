// =====================================
// 1. GET DATA FROM data.js
// =====================================

const shop = window.shopDetails;
const categories = window.category;
const designs = window.design;


// =====================================
// 2. DISPLAY SHOP DETAILS
// =====================================

document.getElementById("shopName").textContent = shop.name;

document.getElementById("shopAddress").textContent = shop.address;

document.getElementById("shopOwner").textContent =
    "Owner: " + shop.owner;

document.getElementById("shopPhone").textContent =
    "Phone: " + shop.phone;


// =====================================
// 3. DISPLAY ALL DESIGNS ON HOME PAGE
// =====================================

const designGrid = document.getElementById("designGrid");

function displayHomeDesigns() {

    designGrid.innerHTML = "";

    designs.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "design-card";

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
            >

            <h3>${item.name}</h3>

            <p>Weight: ${item.weight} grams</p>

            <p>${item.karat}K Gold</p>
        `;

        card.addEventListener("click", function () {
            openImagePopup(item);
        });

        designGrid.appendChild(card);
    });
}

displayHomeDesigns();


// =====================================
// 4. DISPLAY CATEGORIES IN MENU
// =====================================

const categoryList =
    document.getElementById("categoryList");

function displayCategories() {

    categoryList.innerHTML = "";

    categories.forEach(function (categoryItem) {

        // Category container
        const categoryBox =
            document.createElement("div");

        categoryBox.className =
            "category-box";


        // Category heading/button
        const categoryButton =
            document.createElement("button");

        categoryButton.className =
            "category-heading";

        categoryButton.innerHTML = `
            <span>${categoryItem.name}</span>
            <span class="arrow">›</span>
        `;


        // Subcategory container
        const subcategoryBox =
            document.createElement("div");

        subcategoryBox.className =
            "subcategory-list";


        // Create subcategories
        categoryItem.subcategories.forEach(
            function (subcategoryItem) {

                const button =
                    document.createElement("button");

                button.className =
                    "subcategory-button";

                button.textContent =
                    subcategoryItem;


                button.addEventListener(
                    "click",
                    function () {

                        displaySubcategory(
                            categoryItem.name,
                            subcategoryItem
                        );

                        closeMenuDrawer();
                    }
                );


                subcategoryBox.appendChild(button);
            }
        );


        // Expand / collapse category
        categoryButton.addEventListener(
            "click",
            function () {

                categoryBox.classList.toggle(
                    "expanded"
                );
            }
        );


        categoryBox.appendChild(
            categoryButton
        );

        categoryBox.appendChild(
            subcategoryBox
        );

        categoryList.appendChild(
            categoryBox
        );
    });
}

displayCategories();




// =====================================
// 5. MENU DRAWER
// =====================================

const menuButton = document.getElementById("menuButton");

const closeMenu = document.getElementById("closeMenu");

const menuDrawer = document.getElementById("menuDrawer");

const backdrop = document.getElementById("backdrop");


// Open menu
function openMenu() {

    menuDrawer.classList.add("active");

    backdrop.hidden = false;

    menuDrawer.setAttribute(
        "aria-hidden",
        "false"
    );
}


// Close menu
function closeMenuDrawer() {

    menuDrawer.classList.remove("active");

    backdrop.hidden = true;

    menuDrawer.setAttribute(
        "aria-hidden",
        "true"
    );
}


// Menu button
menuButton.addEventListener(
    "click",
    openMenu
);


// Close button
closeMenu.addEventListener(
    "click",
    closeMenuDrawer
);


// Click outside menu
backdrop.addEventListener(
    "click",
    closeMenuDrawer
);


// =====================================
// 6. SUBCATEGORY PAGE
// =====================================

const homePage =
    document.getElementById("homePage");

const subcategoryPage =
    document.getElementById("subcategoryPage");



const allDesigns =
    document.getElementById("allDesigns");

allDesigns.addEventListener(
    "click",
    function () {

        // Remove hash
        window.location.hash = "";

        homePage.hidden = false;

        subcategoryPage.hidden = true;

        closeMenuDrawer();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);

const subcategoryTitle =
    document.getElementById("subcategoryTitle");

const subcategoryDesigns =
    document.getElementById("subcategoryDesigns");


// =====================================
// DISPLAY SUBCATEGORY - DAY 9
// =====================================

// =====================================
// DISPLAY SUBCATEGORY - DAY 10
// =====================================

function displaySubcategory(
    categoryName,
    subcategoryName,
    updateHash = true
) {

    // ---------------------------------
    // CLOSE MENU
    // ---------------------------------

    closeMenuDrawer();


    // ---------------------------------
    // UPDATE URL HASH
    // ---------------------------------

    if (updateHash) {

        const newHash =
            "#" +
            createSlug(categoryName) +
            "-" +
            createSlug(subcategoryName);

        if (window.location.hash !== newHash) {
            window.location.hash = newHash;
        }
    }


    // ---------------------------------
    // SHOW SUBCATEGORY PAGE
    // ---------------------------------

    homePage.hidden = true;

    subcategoryPage.hidden = false;


    // ---------------------------------
    // PAGE TITLE
    // ---------------------------------

    subcategoryTitle.textContent =
        categoryName + " > " + subcategoryName;


    // ---------------------------------
    // CLEAR OLD DESIGNS
    // ---------------------------------

    subcategoryDesigns.innerHTML = "";


    // ---------------------------------
    // FIND MATCHING DESIGNS
    // ---------------------------------

    const filteredDesigns = designs.filter(
        function (item) {

            return (
                item.category.toLowerCase() ===
                categoryName.toLowerCase()
            )
            &&
            (
                item.subcategory.toLowerCase() ===
                subcategoryName.toLowerCase()
            );

        }
    );


    // ---------------------------------
    // NO DESIGNS
    // ---------------------------------

    if (filteredDesigns.length === 0) {

        subcategoryDesigns.innerHTML = `
            <p class="no-designs">
                No designs yet
            </p>
        `;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    // ---------------------------------
    // DISPLAY DESIGNS
    // ---------------------------------

    filteredDesigns.forEach(
        function (item) {

            const card =
                document.createElement("div");

            card.className =
                "subcategory-card";


            card.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >

                <div class="subcategory-info">

                    <h3>${item.name}</h3>

                    <p>
                        Weight: ${item.weight} grams
                    </p>

                    <p>
                        ${item.karat}K Gold
                    </p>

                </div>
            `;


            card.addEventListener(
                "click",
                function () {

                    openImagePopup(item);

                }
            );


            subcategoryDesigns.appendChild(card);

        }
    );


    // ---------------------------------
    // SCROLL TO TOP
    // ---------------------------------

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    // =====================================
// DAY 10 - HASH ROUTING
// =====================================

function createSlug(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
}


// =====================================
// OPEN PAGE FROM URL HASH
// =====================================

function openPageFromHash() {

    const hash =
        window.location.hash.substring(1);


    // ---------------------------------
    // NO HASH = HOME PAGE
    // ---------------------------------

    if (!hash) {

        homePage.hidden = false;

        subcategoryPage.hidden = true;

        return;
    }


    // ---------------------------------
    // FIND CATEGORY + SUBCATEGORY
    // ---------------------------------

    for (const categoryItem of categories) {

        for (
            const subcategoryItem
            of categoryItem.subcategories
        ) {

            const expectedHash =
                createSlug(categoryItem.name) +
                "-" +
                createSlug(subcategoryItem);


            if (hash === expectedHash) {

                displaySubcategory(
                    categoryItem.name,
                    subcategoryItem,
                    false
                );

                return;
            }
        }
    }


    // ---------------------------------
    // INVALID HASH = HOME
    // ---------------------------------

    homePage.hidden = false;

    subcategoryPage.hidden = true;
}


// =====================================
// BROWSER BACK / FORWARD
// =====================================

window.addEventListener(
    "hashchange",
    function () {

        openPageFromHash();

    }
);


// =====================================
// PAGE LOAD / REFRESH
// =====================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        openPageFromHash();

    }
);


    // ---------------------------------
    // 7. IF NO DESIGNS
    // ---------------------------------

    if (filteredDesigns.length === 0) {

        subcategoryDesigns.innerHTML = `
            <p class="no-designs">
                No designs yet
            </p>
        `;

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    // ---------------------------------
    // 8. DISPLAY MATCHING DESIGNS
    // ---------------------------------

    


            // Open image popup
            card.addEventListener(
                "click",
                function () {

                    openImagePopup(item);

                }
            );


            subcategoryDesigns.appendChild(card);

        }
    


    // ---------------------------------
    // 9. SCROLL TO TOP
    // ---------------------------------

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });




// =====================================
// 7. IMAGE POPUP
// =====================================

const imagePopup =
    document.getElementById("imagePopup");

const popupImage =
    document.getElementById("popupImage");

const popupDetails =
    document.getElementById("popupDetails");

const closePopup =
    document.getElementById("closePopup");


function openImagePopup(item) {

    popupImage.src = item.image;

    popupImage.alt = item.name;


    popupDetails.innerHTML = `
        <h2>${item.name}</h2>

        <p>Weight: ${item.weight} grams</p>

        <p>${item.karat}K Gold</p>
    `;


    imagePopup.hidden = false;
}


function closeImagePopup() {

    imagePopup.hidden = true;

    popupImage.src = "";
}


closePopup.addEventListener(
    "click",
    closeImagePopup
);


// =====================================
// 8. CLOSE POPUP WHEN CLICKING OUTSIDE
// =====================================

imagePopup.addEventListener(
    "click",
    function (event) {

        if (event.target === imagePopup) {

            closeImagePopup();
        }
    }
);


// =====================================
// 9. BACK TO HOME
// =====================================

const menuTitle =
    document.querySelector(".menu-bar h2");


menuTitle.addEventListener(
    "click",
    function () {

        homePage.hidden = false;

        subcategoryPage.hidden = true;
    }
); 
// =====================================
// DAY 11 - BIG IMAGE POPUP
// =====================================


const prevDesign =
    document.getElementById("prevDesign");

const nextDesign =
    document.getElementById("nextDesign");

const whatsappButton =
    document.getElementById("whatsappButton");


let currentDesignIndex = 0;


// =====================================
// OPEN POPUP
// =====================================

function openImagePopup(item) {

currentDesignIndex =
       designs.findIndex(function (design) {
            return design.id === item.id;
        });

    showPopupDesign();

    imagePopup.hidden = false;

    // Stop background scrolling
    document.body.style.overflow = "hidden";
}


// =====================================
// SHOW DESIGN
// =====================================

function showPopupDesign() {

    const item = designs[currentDesignIndex];

    if (!item) {
        return;
    }


    // Details

    popupDetails.innerHTML = `
        <h2>${item.name}</h2>

        <p>
            <strong>Weight:</strong>
            ${item.weight} grams
        </p>

        <p>
            <strong>Karat:</strong>
            ${item.karat}K
        </p>

        <p>
            <strong>Category:</strong>
            ${item.category} > ${item.subcategory}
        </p>
    `;


    // Image

    popupImage.src = item.image;

    popupImage.alt = item.name;


    // WhatsApp message

    
    // Arrow buttons

    prevDesign.disabled =
        currentDesignIndex === 0;

    nextDesign.disabled =
        currentDesignIndex === designs.length - 1;
}


// =====================================
// CLOSE POPUP
// =====================================

function closeImagePopup() {

    imagePopup.hidden = true;

    // Allow background scrolling again
    document.body.style.overflow = "";
}


closePopup.addEventListener(
    "click",
    closeImagePopup
);


// =====================================
// CLOSE BY BACKDROP
// =====================================

imagePopup.addEventListener(
    "click",
    function (event) {

        if (event.target === imagePopup) {
            closeImagePopup();
        }

    }
);


// =====================================
// ESCAPE KEY
// =====================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            !imagePopup.hidden
        ) {
            closeImagePopup();
        }

    }
);


// =====================================
// PREVIOUS
// =====================================

prevDesign.addEventListener(
    "click",
    function () {

        if (currentDesignIndex > 0) {

            currentDesignIndex--;

            showPopupDesign();
        }

    }
);


// =====================================
// NEXT
// =====================================

nextDesign.addEventListener(
    "click",
    function () {

        if (
            currentDesignIndex <
            designs.length - 1
        ) {

            currentDesignIndex++;

            showPopupDesign();
        }

    }
);
// =====================================
// WHATSAPP - IMAGE + MESSAGE
// =====================================

whatsappButton.addEventListener("click", async function (event) {

    event.preventDefault();

    const item = designs[currentDesignIndex];

    const message =
        `Hello, I am interested in ${item.name}.
Weight: ${item.weight} grams
Karat: ${item.karat}K
Category: ${item.category} > ${item.subcategory}`;

    // =====================================
    // MOBILE / SUPPORTED BROWSERS
    // Share image + message
    // =====================================

    try {

        const response = await fetch(item.image);

        const blob = await response.blob();

        const file = new File(
            [blob],
            item.name.replace(/\s+/g, "_") + ".webp",
            {
                type: blob.type
            }
        );

        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file]
            })
        ) {

            await navigator.share({
                title: item.name,
                text: message,
                files: [file]
            });

            return;
        }

    } catch (error) {

        console.log(
            "Image sharing not supported:",
            error
        );
    }


    // =====================================
    // DESKTOP FALLBACK
    // Open WhatsApp with message
    // =====================================

    const whatsappURL =
        `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(
        whatsappURL,
        "_blank"
    );

});
// =====================================
// DAY 11 - WHATSAPP WITH JEWELLERY PHOTO
// =====================================

whatsappButton.addEventListener("click", function () {

    const item = designs[currentDesignIndex];

    const message =
        `Hello, I am interested in ${item.name}.
Weight: ${item.weight} grams
Karat: ${item.karat}K
Category: ${item.category} > ${item.subcategory}`;

    const whatsappURL =
        `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});
const photoViewer = document.getElementById("photoViewer");
const largePhoto = document.getElementById("largePhoto");
const closePhotoViewer = document.getElementById("closePhotoViewer");

popupImage.addEventListener("click", function () {
    largePhoto.src = popupImage.src;
    photoViewer.hidden = false;
});

closePhotoViewer.addEventListener("click", function () {
    photoViewer.hidden = true;
});

largePhoto.addEventListener("click", function () {
    photoViewer.hidden = true;
});
//searchbar
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase().trim();

    clearSearch.style.display =
        searchText ? "block" : "none";

    const filteredDesigns = designs.filter(function (item) {

        return (
            item.name.toLowerCase().includes(searchText) ||
            item.category.toLowerCase().includes(searchText) ||
            item.subcategory.toLowerCase().includes(searchText)
        );

    });

    displaySearchResults(filteredDesigns);
});
clearSearch.addEventListener("click", function () {

    searchInput.value = "";

    clearSearch.style.display = "none";

    displaySearchResults(designs);

});
function displaySearchResults(results) {

    homePage.hidden = false;
    subcategoryPage.hidden = true;

    designGrid.innerHTML = "";

    if (results.length === 0) {

        designGrid.innerHTML = `
            <p class="no-designs">
                No jewellery found
            </p>
        `;

        return;
    }

    results.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "design-card";

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
            >

            <h3>${item.name}</h3>

            <p>
                ${item.weight} grams · ${item.karat}K
            </p>
        `;

        card.addEventListener("click", function () {
            openImagePopup(item);
        });

        designGrid.appendChild(card);

    });
}