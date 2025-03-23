import React from "react";

function Logout() {
  const Swal = require("sweetalert2");

  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout from this website!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, LogOut!",
  }).then((result) => {
    //showConfirmButton: false



    // if (result.isConfirmed) {
      
    //   Swal.fire(
    //     "Logged Out!",
    //     "Your account is successfully logged out from this website, and you wil be redirect to home page",
    //     // setTimeout(() => {
    //     //   handleLogout();
    //     // }, 3000),
    //     "success"
    //   );

    //   setTimeout(() => {
    //     handleLogout();
    //   }, 3000);
    // }

    if (result.isConfirmed) {

      Swal.fire({
       
        title: 'Logged Out!',
        text: 'Your account is successfully logged out from this website, and you wil be redirect to home page',
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      })

      
      // Swal.fire(
      //   "Logged Out!",
      //   "Your account is successfully logged out from this website, and you wil be redirect to home page",
      //   // setTimeout(() => {
      //   //   handleLogout();
      //   // }, 3000),
      //   "success"
      // );

      setTimeout(() => {
        handleLogout();
      }, 8000);
    }

    else{
      Swal.fire({
       
        title: 'Cancelled',
        text: 'Your changes are saved 🙂',
       //  showConfirmButton: false,
        timer: 2000
      })
 
    }
  });

  const handleLogout = () => {
    localStorage.clear(); // clear user session data
    window.location.href = "/";
  };

  return (
    <>
      <div>
        {/* <h2>Thanks for visiting this website .....</h2> */}
        {/* <button onClick={log}>click here</button> */}
      </div>
    </>
  );
}

export default Logout;

