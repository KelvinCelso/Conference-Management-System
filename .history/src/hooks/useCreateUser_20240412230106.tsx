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

export interface ICreateUser extends IUserBaseInfo, IReviewerInfo {
  program?: String;
  supervisor?: String;
  reviewCapacity?: String;
}

export interface IUserBaseInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface IAuthorInfo {
  affiliation: String;
  academicInterest: String;
  program?: String;
  supervisor?: String;
}
export interface IReviewerInfo {
  affiliation: String;
  academicInterest: String;
}

const useCreateUser = (userRole: RoleType) => {
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
          firstName,
          lastName,
          email,
          phone,
          affiliation,
          supervisor,
          program,
          academicInterest,
          appliedProjects: [],
          submittedPapers: [],
          paperResults: [],
          id: authUid,
        });
      } else if (userRole === "reviewer") {
        await setDoc(usersCollectionRef, {
          firstName,
          lastName,
          email,
          phone,
          affiliation,
          program,
          academicInterest,
          reviewCapacity,
          reviewedProjects: [],
          submittedPapers: [],
          id: authUid,
        });
      }

      navigate(`/${userRole}-dashboard`, {
        state: {
          firstName,
          lastName,
          email,
          phone,
          affiliation,
          program,
          academicInterest,
          reviewCapacity,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createUser,
  };
};

export default useCreateUser;
