document.addEventListener("DOMContentLoaded", () => {
    const template = document.getElementById("devblog_template");
    const container = document.getElementById("devblog-list");
    const modal = document.getElementById("blog-modal");
    const modalBox = modal.querySelector(".modal-box");
    const modalImg = modal.querySelector(".modal-img");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDate = modal.querySelector(".modal-date");
    const modalDesc = modal.querySelector(".modal-description");
    const modalClose = modal.querySelector(".modal-close");

    if (!template || !container) return;

    fetch("../data/devblogs.json")
        .then(response => response.json())
        .then(blogs => {

            blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

            blogs.forEach(blog => {
                const clone = template.content.cloneNode(true);

                clone.querySelector(".gameimg").src = blog.image;
                clone.querySelector(".title").textContent = blog.title;
                clone.querySelector(".date").textContent = blog.date;

                const card = clone.querySelector(".card");
                card.addEventListener("click", () => {
                    modalImg.src = blog.image;
                    modalTitle.textContent = blog.title;
                    modalDate.textContent = blog.date;
                    modalDesc.textContent = blog.description;
                    modal.classList.add("active");
                    setTimeout(() => modalBox.classList.add("active"), 10); 
                });

                container.appendChild(clone);
            });
        });

    // close modal on button click
    modalClose.addEventListener("click", () => {
        modalBox.classList.remove("active");
        setTimeout(() => modal.classList.remove("active"), 150);
    });

    // close modal when clicking outside the box
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modalBox.classList.remove("active");
            setTimeout(() => modal.classList.remove("active"), 150);
        }
    });
});