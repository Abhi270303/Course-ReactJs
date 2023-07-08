import "./App.css";
import fakeData from "./Fakedata/fakeData";
import bannerImage from "./images/topGreenBanner.webp";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home/Home";
import {initializeApp} from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
import { firebaseConfig } from "./firebase.config";

const app = initializeApp(firebaseConfig)
getAnalytics(app);
function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [cart, setCart] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  // Login user state
  const [user, setUser] = useState({
    // Set default value
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    token: ""
  });
  // Login signup handler
  // Used navigate for a better user experience
  const loginSignupHandler = (navigate) => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const {displayName, email, photoURL} = result.user;
      const newLoggedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        token: token
      };
      setUser(newLoggedInUser)
      navigate(-1);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error", errorCode, errorMessage, email, credential);
      // ...
    });
  }

// Handle SIgn out
const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    const signedOutUser = {
      isSignedIn: false,
      name: "",
      email: "",
      photo: "",
      token: ""
    };
    setUser(signedOutUser);
  }).catch((error) => {
    // An error happened.
    console.log("Error", error);
  });
}


  // Add cart function
  const addToCart = (course, in_cart) => {
    //Check if the course is already in the cart
    const ifCourseExist = cart.find((singleCourse) => singleCourse.id === course.id);
    if(ifCourseExist){
      alert("Course already added to cart");
    }else{
    const currentProductId = course.id;
    // Add in_cart property to the course object
    fakeData.find((singleCourse) => singleCourse.id === currentProductId).in_cart = true;
    setCart([...cart, course]);
    setUnitPrice(course.price);
    in_cart = !in_cart;
    // console.log("Course", ifCourseExist, fakeData)
    console.log("Course added ", course, in_cart);
    }
  };

  const giveAlert = () => {
    alert("Coming Soon!");
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          
            <Route
              index
              element={
                <Home
                  fakeData={fakeData}
                  bannerImage={bannerImage}
                  addToCart={addToCart}
                  cart={cart}
                  unitPrice={unitPrice}
                />
              }
            />
            
            
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//! Scraped data code from skill share

// var time = document.querySelectorAll('.ss-class__stats__duration');
// var isss = document.querySelectorAll('.thumbnail-img');
// var title = document.querySelectorAll('.ss-card__title');
// for(let i = 0; i < isss.length; i++){
// console.log(`"length": "${time[i].innerText}",`)
// console.log(`"title": "${title[i].innerText}",`);
//console.log(`"type": "Crafts",`);
// console.log(`"course_thumbnail": "${isss[i].src}"`);
// }
