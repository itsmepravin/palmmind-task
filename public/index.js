// Reloading after New User Form Submission
$("form").submit(function () {
  setTimeout(() => location.reload(), 500);
});

// Tracking Dropdown value of Update User Modal,
// communicating to backend, and getting that user details,
// and filling the respective inputs
$("#dropdownMenuLink").on("change", function () {
  const toUpdateUser = $(this).val();
  fetch("/getUserDetails", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      toUpdateUser,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      $("input[name=updateName]").val(data.name);
      $("input[name=updateAddress]").val(data.address);
      $("input[name=updateAge]").val(data.age);
    });
});

//Getting all the input values, then sending a PUT request
$("#updateBtn").on("click", function () {
  const updateName = $("input[name=updateName]").val();
  const updateAddress = $("input[name=updateAddress]").val();
  const updateAge = $("input[name=updateAge]").val();

  fetch("/updateSingleUser", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      updateName,
      updateAddress,
      updateAge,
    }),
  });
  location.reload();
});

// Getting the user to be deleted, communicating that to the backend,
// then reloading the page
const handleDeleteUser = function (event) {
  fetch("/deleteSingleUser", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userToDelete: event.target.innerText.toString(),
    }),
  });
  location.reload();
};
