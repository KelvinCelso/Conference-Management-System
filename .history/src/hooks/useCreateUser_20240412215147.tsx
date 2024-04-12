// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const useCreateUser = (userData: object, userRole: RoleType) => {
//   const navigate = useNavigate();
//   const createUser = async (auth: any, email: string, password: string) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const authUid = userCredential.user.uid;

//       const usersCollectionRef = collection(db, `${userRole}Users`);
//       if (userRole === "author") {
//         await addDoc(usersCollectionRef, {
//           ...userData,
//           authUid,
//           appliedProjects: [],
//         });
//       } else {
//         await addDoc(usersCollectionRef, { ...userData, authUid });
//       }

//       navigate(`/${userRole}-dashboard`, { state: userData });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return {
//     createUser,
//   };
// };

// export default useCreateUser;

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { RoleType } from "../data/pages/Form/registration/InitialRegisterFormData";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ICreateUser {
  firstName: string;
  lastName: string;
  affiliation: String;
  email: string;
  phone: string;
  academicInterest: String;
  password: string;
  program?: String;
  supervisor?: String;
  reviewCapacity?: String;
}

const useCreateUser = (userData: object, userRole: RoleType) => {
  const navigate = useNavigate();
  const createUser = async (
    auth: any,
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      affiliation,
      supervisor,
      reviewCapacity,
      program,
      academicInterest,
    }: ICreateUser
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const authUid = userCredential.user.uid;

      const usersCollectionRef = doc(db, `${userRole}Users`, authUid);
      if (userRole === "author") {
        await setDoc(usersCollectionRef, {
          ...userData,
          appliedProjects: [],
          submittedPapers: [],
          paperResults: [],
          id: authUid,
        });
      } else if (userRole === "reviewer") {
        await setDoc(usersCollectionRef, {
          ...userData,
          reviewedProjects: [],
          submittedPapers: [],
          id: authUid,
        });
      }

      navigate(`/${userRole}-dashboard`, { state: userData });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createUser,
  };
};

export default useCreateUser;
