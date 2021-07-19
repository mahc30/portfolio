let mail_form = document.getElementById("mail_form");
let send_btn = document.getElementById("send_email_btn");

mail_form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(this);

    send_btn.setAttribute("href", `mailto:dahinkpie@gmail.com?subject=${form.get("name")} from ${form.get("email")}&body=Message: ${form.get("message")}`);
    send_btn.click();
}