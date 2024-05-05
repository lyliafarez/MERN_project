import Swal from "sweetalert2";

const showSweetAlert = (title:string,text:string,icon:string,confirmButtonText:string)=>{
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
      });
}

export default showSweetAlert