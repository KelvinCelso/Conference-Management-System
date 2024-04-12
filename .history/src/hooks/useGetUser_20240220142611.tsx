// import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
// import { useNavigate } from "react-router-dom";

// const useGetUser = () => {
//   const navigate = useNavigate();
//   const getUser = async (
//     email: string,
//     password: string,
//     userRole: RoleType
//   ) => {
//     console.log(email, password);
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const userIdFromAuth = userCredential.user.uid;
//       const usersCollectionRef = collection(db, `${userRole}Users`);
//       const userQuery = query(
//         usersCollectionRef,
//         where("authUid", "==", userIdFromAuth)
//       );
//       const querySnapshot = await getDocs(userQuery);

//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => {
//           const userData = doc.data();
//           navigate(`/${userRole}-dashboard`, { state: { userData } });
//           // console.log(userData);
//         });
//       } else {
//         console.log("User document not found.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return {
//     getUser,
//   };
// };

// export default useGetUser;



import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
import { useNavigate } from "react-router-dom";

const useGetUser = () => {
  const navigate = useNavigate();
  const getUser = async (
    email: string,
    password: string,
    userRole: RoleType
  ) => {
    console.log(email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userIdFromAuth = userCredential.user.uid;
      
      const userDocRef = doc(db, `${userRole}Users`, userIdFromAuth);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        navigate(`/${userRole}-dashboard`, { state: { userData } });
        // console.log(userData);
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getUser,
  };
};

export default useGetUser;
