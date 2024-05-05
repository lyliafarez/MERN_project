import Swal from "sweetalert2";

const showSweetAlert = (title,text,icon,confirmButtonText)=>{
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
      });
}

export default showSweetAlert